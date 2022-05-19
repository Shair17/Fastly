import { Service } from "fastify-decorators";
import {
  LogInWithFacebookType,
  AdminLoginType,
  AdminRegisterType,
  ForgotAdminPasswordType,
  ChangeAdminPasswordType,
  CustomerLoginType,
  CustomerRegisterType,
  ForgotCustomerPasswordType,
  ChangeCustomerPasswordType,
  DealerLoginType,
  DealerRegisterType,
  ForgotDealerPasswordType,
  ChangeDealerPasswordType,
  NewAdminPasswordType,
  NewDealerPasswordType,
  NewCustomerPasswordType,
  RefreshFacebookTokenType,
  RefreshAdminTokenType,
  RefreshCustomerTokenType,
  RefreshDealerTokenType,
} from "./auth.schema";
import { HttpService } from "../../shared/services/http.service";
import { PasswordService } from "../../shared/services/password.service";
import { trimStrings } from "../../utils/trimStrings";
import { UserService } from "../user/user.service";
import { AdminService } from "../admin/admin.service";
import { buildFacebookUri } from "../../utils/buildFacebookUri";
import { FacebookGraphApiResponse } from "./dto/facebookGraphApiResponse.dto";
import {
  Unauthorized,
  NotFound,
  BadRequest,
  InternalServerError,
} from "http-errors";
import { CustomerService } from "../customer/customer.service";
import { DealerService } from "../dealer/dealer.service";
import { TokenService } from "../../shared/services/token.service";
import { MailService } from "../../shared/services/mail.service";

/**
 * @CreatedBy Shair17
 * @Shair17 aka as Jimmy Morales
 * @For Fastly Delivery 2022
 * @Copyright Todos los derechos reservados 2022.
 * TODO: Hacer la configuración del servicio de correos para poder enviar los correos de recuperación de contraseñas
 * TODO: Probar todos los endpoints
 * TODO: Conectar el servidor a sus respectivos frontends
 */

@Service()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserService,
    private readonly adminService: AdminService,
    private readonly customerService: CustomerService,
    private readonly dealerService: DealerService,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService,
    private readonly passwordService: PasswordService
  ) {}

  async logInWithFacebook(data: LogInWithFacebookType) {
    let facebookId: string = "",
      name: string = "";

    const [facebookAccessToken, facebookUserID] = trimStrings(
      data.accessToken,
      data.userID
    );

    const FACEBOOK_API_URI = buildFacebookUri(facebookAccessToken);

    try {
      const { data } = await this.httpService.get<FacebookGraphApiResponse>(
        FACEBOOK_API_URI
      );
      facebookId = data.id;
      name = data.name;
    } catch (err) {
      throw new NotFound("data_not_found");
    }

    if (facebookUserID !== facebookId) {
      throw new Unauthorized();
    }

    console.log(
      "el userID proporcionado por el frontend y el obtenido por el backend son los mismos, coinciden, lo dejamos pasar"
    );

    const user = await this.userService.getByFacebookUserID(facebookId);

    // El usuario ya tiene una cuenta, entonces procedemos a verificar si está baneado y/o tiene direcciones
    if (user !== null) {
      // TODO -> AGREGAR DIRECCIONES

      if (user.isBanned) {
        console.log("usuario baneado");
        console.log(
          "benado?",
          user.isBanned ? "si" : "no",
          "razón:",
          user.banReason
        );
        throw new Unauthorized("banned");
      }

      const { accessToken, refreshToken } = this.tokenService.generateTokens(
        "user",
        {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      );

      try {
        await this.userService.save({
          ...user,
          refreshToken,
        });
      } catch (error) {
        throw new InternalServerError();
      }

      // TODO también devolver datos del usuario
      return {
        accessToken,
        refreshToken,
      };
    }

    // El usuario es nuevo, vamos a crear uno!
    const newUser = await this.userService.save({
      facebookId,
      facebookAccessToken,
      name,
    });

    const { accessToken, refreshToken } = this.tokenService.generateTokens(
      "user",
      {
        id: newUser.id,
        name: newUser.name,
      }
    );

    try {
      await this.userService.save({
        ...newUser,
        refreshToken,
      });
    } catch (error) {
      throw new InternalServerError();
    }

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshFacebookToken({ refreshToken }: RefreshFacebookTokenType) {
    const decoded = this.tokenService.verifyRefreshToken("user", refreshToken);
    let accessToken: string;

    console.log("payload del refresh token de facebook ->", decoded);

    const user = await this.userService.getById(decoded.id);

    if (!user) {
      throw new Unauthorized();
    }

    if (user.email) {
      accessToken = this.tokenService.generateAccessToken("user", {
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } else {
      accessToken = this.tokenService.generateAccessToken("user", {
        id: user.id,
        name: user.name,
      });
    }

    return {
      statusCode: 200,
      accessToken,
      refreshToken,
      success: true,
    };
  }

  async logOutFromFacebook(id: string) {
    const user = await this.userService.getById(id);

    if (!user) {
      throw new BadRequest();
    }

    try {
      await this.userService.save({
        ...user,
        refreshToken: null,
      });
    } catch (error) {
      throw new InternalServerError();
    }

    return {
      statusCode: 200,
      success: true,
    };
  }

  async logInAdmin(data: AdminLoginType) {
    const [email] = trimStrings(data.email);

    const admin = await this.adminService.getByEmail(email);

    if (!admin) {
      console.log("no hay el admin");
      throw new Unauthorized("invalid_credentials");
    }

    if (!(await this.passwordService.verify(admin.password, data.password))) {
      throw new Unauthorized("invalid_credentials");
    }

    if (admin.isBanned) {
      throw new Unauthorized("banned");
    }

    if (!admin.isActive) {
      throw new Unauthorized("inactive_account");
    }

    const { accessToken, refreshToken } = this.tokenService.generateTokens(
      "admin",
      {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      }
    );

    try {
      await this.adminService.save({
        ...admin,
        refreshToken,
      });
    } catch (error) {
      throw new InternalServerError();
    }

    // TODO también devolver datos del admin
    return {
      accessToken,
      refreshToken,
    };
  }

  async registerAdmin(data: AdminRegisterType) {
    const [address, dni, email, name, phone, birthDate] = trimStrings(
      data.address,
      data.dni,
      data.email,
      data.name,
      data.phone,
      data.birthDate
    );

    const numberOfAdmins = await this.adminService.count();

    if (numberOfAdmins !== 0) {
      throw new BadRequest("service_disabled");
    }

    const foundAdmin = await this.adminService.getByEmail(email);

    if (foundAdmin) {
      throw new BadRequest("account_taken");
    }

    const hashedPassword = await this.passwordService.hash(data.password);

    // example: new Date("11/29/2001")

    const newAdmin = await this.adminService.save({
      address,
      avatar: data.avatar,
      birthDate: new Date(birthDate),
      dni,
      email,
      name,
      phone,
      password: hashedPassword,
      isActive: numberOfAdmins === 0,
    });

    const { accessToken, refreshToken } = this.tokenService.generateTokens(
      "admin",
      {
        id: newAdmin.id,
        name: newAdmin.name,
        email: newAdmin.email,
      }
    );

    try {
      await this.adminService.save({
        ...newAdmin,
        refreshToken,
      });
    } catch (error) {
      throw new InternalServerError();
    }

    // TODO también devolver datos del admin
    return {
      accessToken,
      refreshToken,
    };
  }

  async forgotAdminPassword({ email }: ForgotAdminPasswordType) {
    const admin = await this.adminService.getByEmail(email);

    if (!admin) {
      throw new BadRequest();
    }

    const resetPasswordToken = this.tokenService.generateForgotPasswordToken(
      "admin",
      {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      }
    );

    try {
      await this.adminService.save({
        ...admin,
        resetPasswordToken,
      });
    } catch (error) {
      throw new InternalServerError();
    }

    // TODO: Enviar correo aquí

    return {
      resetPasswordToken,
    };
  }

  async newAdminPassword({
    newPassword,
    resetPasswordToken,
  }: NewAdminPasswordType) {
    const decoded = this.tokenService.verifyForgotPasswordToken(
      "admin",
      resetPasswordToken
    );
    console.log("payload del reset password token ->", decoded);

    const admin = await this.adminService.getById(decoded.id);

    if (!admin) {
      throw new Unauthorized();
    }

    if (
      admin.resetPasswordToken &&
      admin.resetPasswordToken !== resetPasswordToken
    ) {
      throw new Unauthorized();
    }

    const hashedPassword = await this.passwordService.hash(newPassword);

    try {
      await this.adminService.save({
        ...admin,
        password: hashedPassword,
      });
    } catch (error) {
      throw new InternalServerError();
    }

    return {
      statusCode: 200,
      message: "Password changed",
      success: true,
    };
  }

  async changeAdminPassword(
    adminId: string,
    { oldPassword, newPassword }: ChangeAdminPasswordType
  ) {
    const admin = await this.adminService.getById(adminId);

    if (!admin) {
      throw new Unauthorized();
    }

    if (!(await this.passwordService.verify(admin.password, oldPassword))) {
      throw new Unauthorized("invalid_credentials");
    }

    const hashedPassword = await this.passwordService.hash(newPassword);

    try {
      await this.adminService.save({
        ...admin,
        password: hashedPassword,
      });
    } catch (error) {
      throw new InternalServerError();
    }

    return {
      statusCode: 200,
      message: "Password changed",
      success: true,
    };
  }

  async refreshAdminToken({ refreshToken }: RefreshAdminTokenType) {
    const decoded = this.tokenService.verifyRefreshToken("admin", refreshToken);

    console.log("payload del refresh token de admin ->", decoded);

    const admin = await this.adminService.getById(decoded.id);

    if (!admin) {
      throw new Unauthorized();
    }

    const accessToken = this.tokenService.generateAccessToken("admin", {
      id: admin.id,
      name: admin.name,
      email: admin.email,
    });

    return {
      statusCode: 200,
      accessToken,
      refreshToken,
      success: true,
    };
  }

  async logOutAdmin(id: string) {
    const admin = await this.adminService.getById(id);

    if (!admin) {
      throw new BadRequest();
    }

    try {
      await this.adminService.save({
        ...admin,
        refreshToken: null,
      });
    } catch (error) {
      throw new InternalServerError();
    }

    return {
      statusCode: 200,
      success: true,
    };
  }

  async loginCustomer(data: CustomerLoginType) {
    const [email] = trimStrings(data.email);

    const customer = await this.customerService.getByEmail(email);

    if (!customer) {
      throw new Unauthorized("invalid_credentials");
    }

    if (
      !(await this.passwordService.verify(customer.password, data.password))
    ) {
      throw new Unauthorized("invalid_credentials");
    }

    if (customer.isBanned) {
      throw new Unauthorized("banned");
    }

    if (!customer.isActive) {
      throw new Unauthorized("inactive_account");
    }

    const { accessToken, refreshToken } = this.tokenService.generateTokens(
      "customer",
      {
        id: customer.id,
        name: customer.name,
        email: customer.email,
      }
    );

    try {
      await this.customerService.save({
        ...customer,
        refreshToken,
      });
    } catch (error) {
      throw new InternalServerError();
    }

    // TODO también devolver datos del customer
    return {
      accessToken,
      refreshToken,
    };
  }

  async registerCustomer(data: CustomerRegisterType) {
    const [address, dni, email, name, phone, birthDate] = trimStrings(
      data.address,
      data.dni,
      data.email,
      data.name,
      data.phone,
      data.birthDate
    );

    const foundCustomer = await this.customerService.getByEmail(email);

    if (foundCustomer) {
      throw new BadRequest("account_taken");
    }

    const hashedPassword = await this.passwordService.hash(data.password);

    // birthDate example: new Date("11/29/2001")

    const newCustomer = await this.customerService.save({
      address,
      avatar: data.avatar,
      birthDate: new Date(birthDate),
      dni,
      email,
      name,
      phone,
      password: hashedPassword,
      isActive: false,
    });

    const { accessToken, refreshToken } = this.tokenService.generateTokens(
      "customer",
      {
        id: newCustomer.id,
        name: newCustomer.name,
        email: newCustomer.email,
      }
    );

    try {
      await this.customerService.save({
        ...newCustomer,
        refreshToken,
      });
    } catch (error) {
      throw new InternalServerError();
    }

    // TODO también devolver datos del customer
    return {
      accessToken,
      refreshToken,
    };
  }

  async forgotCustomerPassword({ email }: ForgotCustomerPasswordType) {
    const customer = await this.customerService.getByEmail(email);

    if (!customer) {
      throw new BadRequest();
    }

    const resetPasswordToken = this.tokenService.generateForgotPasswordToken(
      "customer",
      {
        id: customer.id,
        name: customer.name,
        email: customer.email,
      }
    );

    // enviar correo aquí

    try {
      await this.customerService.save({
        ...customer,
        resetPasswordToken,
      });
    } catch (error) {
      throw new InternalServerError();
    }

    return {
      resetPasswordToken,
    };
  }

  async newCustomerPassword({
    newPassword,
    resetPasswordToken,
  }: NewCustomerPasswordType) {
    const decoded = this.tokenService.verifyForgotPasswordToken(
      "customer",
      resetPasswordToken
    );
    console.log("payload del reset password token ->", decoded);

    const customer = await this.customerService.getById(decoded.id);

    if (!customer) {
      throw new Unauthorized();
    }

    if (
      customer.resetPasswordToken &&
      customer.resetPasswordToken !== resetPasswordToken
    ) {
      throw new Unauthorized();
    }

    const hashedPassword = await this.passwordService.hash(newPassword);

    try {
      await this.customerService.save({
        ...customer,
        password: hashedPassword,
      });
    } catch (error) {
      throw new InternalServerError();
    }

    return {
      statusCode: 200,
      message: "Password changed",
      success: true,
    };
  }

  async changeCustomerPassword(
    customerId: string,
    { oldPassword, newPassword }: ChangeCustomerPasswordType
  ) {
    const customer = await this.customerService.getById(customerId);

    if (!customer) {
      throw new Unauthorized();
    }

    if (!(await this.passwordService.verify(customer.password, oldPassword))) {
      throw new Unauthorized("invalid_credentials");
    }

    const hashedPassword = await this.passwordService.hash(newPassword);

    try {
      await this.customerService.save({
        ...customer,
        password: hashedPassword,
      });
    } catch (error) {
      throw new InternalServerError();
    }

    return {
      statusCode: 200,
      message: "Password changed",
      success: true,
    };
  }

  async refreshCustomerToken({ refreshToken }: RefreshCustomerTokenType) {
    const decoded = this.tokenService.verifyRefreshToken(
      "customer",
      refreshToken
    );

    console.log("payload del refresh token de customer ->", decoded);

    const customer = await this.customerService.getById(decoded.id);

    if (!customer) {
      throw new Unauthorized();
    }

    const accessToken = this.tokenService.generateAccessToken("customer", {
      id: customer.id,
      name: customer.name,
      email: customer.email,
    });

    return {
      statusCode: 200,
      accessToken,
      refreshToken,
      success: true,
    };
  }

  async logOutCustomer(id: string) {
    const customer = await this.customerService.getById(id);

    if (!customer) {
      throw new BadRequest();
    }

    try {
      await this.customerService.save({
        ...customer,
        refreshToken: null,
      });
    } catch (error) {
      throw new InternalServerError();
    }

    return {
      statusCode: 200,
      success: true,
    };
  }

  async loginDealer(data: DealerLoginType) {
    const [email] = trimStrings(data.email);

    const dealer = await this.dealerService.getByEmail(email);

    if (!dealer) {
      console.log("no hay el dealer");
      throw new Unauthorized("invalid_credentials");
    }

    if (!(await this.passwordService.verify(dealer.password, data.password))) {
      console.log("contraseña incorrecta del dealer");
      throw new Unauthorized("invalid_credentials");
    }

    if (dealer.isBanned) {
      throw new Unauthorized("banned");
    }

    if (!dealer.isActive) {
      throw new Unauthorized("inactive_account");
    }

    const { accessToken, refreshToken } = this.tokenService.generateTokens(
      "dealer",
      {
        id: dealer.id,
        name: dealer.name,
        email: dealer.email,
      }
    );

    try {
      await this.dealerService.save({
        ...dealer,
        refreshToken,
      });
    } catch (error) {
      throw new InternalServerError();
    }

    // TODO también devolver datos del usuario
    return {
      accessToken,
      refreshToken,
    };
  }

  async registerDealer(data: DealerRegisterType) {
    const [address, dni, email, name, phone, birthDate] = trimStrings(
      data.address,
      data.dni,
      data.email,
      data.name,
      data.phone,
      data.birthDate
    );

    const foundDealer = await this.dealerService.getByEmail(email);

    if (foundDealer) {
      throw new BadRequest("account_taken");
    }

    const hashedPassword = await this.passwordService.hash(data.password);

    // birthDate example: new Date("11/29/2001")

    const newDealer = await this.dealerService.save({
      address,
      avatar: data.avatar,
      birthDate: new Date(birthDate),
      dni,
      email,
      name,
      phone,
      password: hashedPassword,
      isActive: false,
    });

    const { accessToken, refreshToken } = this.tokenService.generateTokens(
      "dealer",
      {
        id: newDealer.id,
        name: newDealer.name,
        email: newDealer.email,
      }
    );

    try {
      await this.dealerService.save({
        ...newDealer,
        refreshToken,
      });
    } catch (error) {
      throw new InternalServerError();
    }

    // TODO también devolver datos del dealer
    return {
      accessToken,
      refreshToken,
    };
  }

  async forgotDealerPassword({ email }: ForgotDealerPasswordType) {
    const dealer = await this.dealerService.getByEmail(email);

    if (!dealer) {
      throw new BadRequest();
    }

    const resetPasswordToken = this.tokenService.generateForgotPasswordToken(
      "dealer",
      {
        id: dealer.id,
        name: dealer.name,
        email: dealer.email,
      }
    );

    try {
      await this.dealerService.save({
        ...dealer,
        resetPasswordToken,
      });
    } catch (error) {
      throw new InternalServerError();
    }

    return {
      resetPasswordToken,
    };
  }

  async newDealerPassword({
    newPassword,
    resetPasswordToken,
  }: NewDealerPasswordType) {
    const decoded = this.tokenService.verifyForgotPasswordToken(
      "dealer",
      resetPasswordToken
    );
    console.log("payload del reset password token ->", decoded);

    const dealer = await this.dealerService.getById(decoded.id);

    if (!dealer) {
      throw new Unauthorized();
    }

    if (
      dealer.resetPasswordToken &&
      dealer.resetPasswordToken !== resetPasswordToken
    ) {
      throw new Unauthorized();
    }

    const hashedPassword = await this.passwordService.hash(newPassword);

    try {
      await this.dealerService.save({
        ...dealer,
        password: hashedPassword,
      });
    } catch (error) {
      throw new InternalServerError();
    }

    return {
      statusCode: 200,
      message: "Password changed",
      success: true,
    };
  }

  async changeDealerPassword(
    dealerId: string,
    { oldPassword, newPassword }: ChangeDealerPasswordType
  ) {
    const dealer = await this.dealerService.getById(dealerId);

    if (!dealer) {
      throw new Unauthorized();
    }

    if (!(await this.passwordService.verify(dealer.password, oldPassword))) {
      throw new Unauthorized("invalid_credentials");
    }

    const hashedPassword = await this.passwordService.hash(newPassword);

    try {
      await this.dealerService.save({
        ...dealer,
        password: hashedPassword,
      });
    } catch (error) {
      throw new InternalServerError();
    }

    return {
      statusCode: 200,
      message: "Password changed",
      success: true,
    };
  }

  async refreshDealerToken({ refreshToken }: RefreshDealerTokenType) {
    const decoded = this.tokenService.verifyRefreshToken(
      "dealer",
      refreshToken
    );

    console.log("payload del refresh token de dealer ->", decoded);

    const dealer = await this.dealerService.getById(decoded.id);

    if (!dealer) {
      throw new Unauthorized();
    }

    const accessToken = this.tokenService.generateAccessToken("dealer", {
      id: dealer.id,
      name: dealer.name,
      email: dealer.email,
    });

    return {
      statusCode: 200,
      accessToken,
      refreshToken,
      success: true,
    };
  }

  async logOutDealer(id: string) {
    const dealer = await this.dealerService.getById(id);

    if (!dealer) {
      throw new BadRequest();
    }

    try {
      await this.dealerService.save({
        ...dealer,
        refreshToken: null,
      });
    } catch (error) {
      throw new InternalServerError();
    }

    return {
      statusCode: 200,
      success: true,
    };
  }
}
