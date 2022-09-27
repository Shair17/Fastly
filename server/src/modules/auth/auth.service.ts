import {Service} from 'fastify-decorators';
import {
  Unauthorized,
  NotFound,
  BadRequest,
  InternalServerError,
} from 'http-errors';
import {
  MailService,
  HttpService,
  PasswordService,
  TokenService,
  CloudinaryService,
  AvatarService,
} from '../../shared/services';
import {trimStrings} from '../../utils/trimStrings';
import {UserService} from '../user/user.service';
import {AdminService} from '../admin/admin.service';
import {CustomerService} from '../customer/customer.service';
import {DealerService} from '../dealer/dealer.service';
import {FacebookGraphApiResponse} from './auth.dto';
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
} from './auth.schema';
import {isString} from '../../utils';

type Payload = {
  id: string;
  name: string;
  email?: string;
};

@Service('AuthServiceToken')
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserService,
    private readonly adminService: AdminService,
    private readonly customerService: CustomerService,
    private readonly dealerService: DealerService,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService,
    private readonly passwordService: PasswordService,
    private readonly avatarService: AvatarService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  buildFacebookApiUri(accessToken: string): string {
    return `https://graph.facebook.com/me?access_token=${accessToken}`;
  }

  async logInWithFacebook(data: LogInWithFacebookType) {
    let facebookId: string = '',
      name: string = '';

    const [facebookAccessToken, facebookUserID] = trimStrings(
      data.accessToken,
      data.userID,
    );

    const FACEBOOK_API_URI = this.buildFacebookApiUri(facebookAccessToken);

    try {
      const {data} = await this.httpService.get<FacebookGraphApiResponse>(
        FACEBOOK_API_URI,
      );
      facebookId = data.id;
      name = data.name;
    } catch (err) {
      throw new NotFound('data_not_found');
    }

    if (facebookUserID !== facebookId) {
      throw new Unauthorized();
    }

    const user = await this.userService.getByFacebookUserID(facebookId);

    if (!user) {
      const newUser = await this.userService.createUser({
        name,
        facebookId,
        facebookAccessToken,
        avatar: this.avatarService.getDefaultAvatar(),
      });

      let payload: Payload = {
        id: newUser.id,
        name: newUser.name,
      };

      if (newUser.email) {
        payload = {
          ...payload,
          email: newUser.email,
        };
      }

      const {accessToken, refreshToken} = this.tokenService.generateTokens(
        'user',
        payload,
      );

      try {
        await this.userService.updateUserRefreshToken(newUser.id, refreshToken);
      } catch (error) {
        throw new InternalServerError();
      }

      const {
        facebookAccessToken: newUserFacebookAccessToken,
        refreshToken: newUserRefreshToken,
        ...restOfNewUser
      } = newUser;

      return {
        accessToken,
        refreshToken,
        user: {
          ...restOfNewUser,
          // @ts-ignore
          isNewUser: this.userService.isNewUser(newUser),
        },
      };
    }

    if (user.isBanned) {
      console.log(`Usuario con id ${user.id} baneado por ${user.banReason}`);
      throw new Unauthorized('banned');
    }

    let payload: Payload = {
      id: user.id,
      name: user.name,
    };

    if (user.email) {
      payload = {
        ...payload,
        email: user.email,
      };
    }

    const {accessToken, refreshToken} = this.tokenService.generateTokens(
      'user',
      payload,
    );

    try {
      await this.userService.updateUserRefreshToken(user.id, refreshToken);
    } catch (error) {
      console.log(error);
      throw new InternalServerError();
    }

    const {
      facebookAccessToken: _facebookAccessToken,
      refreshToken: userRefreshToken,
      ...restOfUser
    } = user;

    return {
      accessToken,
      refreshToken,
      user: {
        ...restOfUser,
        isNewUser: this.userService.isNewUser(user),
      },
    };
  }

  async refreshFacebookToken({refreshToken}: RefreshFacebookTokenType) {
    const decoded = this.tokenService.verifyRefreshToken('user', refreshToken);
    const user = await this.userService.getByIdOnlyUserOrThrow(decoded.id);

    let payload: Payload = {
      id: user.id,
      name: user.name,
    };

    if (user.email) {
      payload = {
        ...payload,
        email: user.email,
      };
    }

    const accessToken = this.tokenService.generateAccessToken('user', payload);

    return {
      statusCode: 200,
      accessToken,
      refreshToken,
      success: true,
    };
  }

  async logOutFromFacebook(id: string) {
    const user = await this.userService.getByIdOnlyUserOrThrow(id);

    try {
      await this.userService.updateUserRefreshToken(user.id, null);
    } catch (error) {
      console.log(error);
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
      throw new Unauthorized('invalid_credentials');
    }

    if (!this.passwordService.isValidPassword(data.password)) {
      throw new BadRequest('invalid_password');
    }

    if (!(await this.passwordService.verify(admin.password, data.password))) {
      throw new Unauthorized('invalid_credentials');
    }

    if (admin.isBanned) {
      throw new Unauthorized('banned');
    }

    if (!admin.isActive) {
      throw new Unauthorized('inactive_account');
    }

    const {accessToken, refreshToken} = this.tokenService.generateTokens(
      'admin',
      {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    );

    try {
      await this.adminService.updateAdminRefreshToken(admin.id, refreshToken);
    } catch (error) {
      throw new InternalServerError();
    }

    const {
      password,
      refreshToken: _refreshToken,
      resetPasswordToken,
      ...restOfAdmin
    } = admin;

    return {
      accessToken,
      refreshToken,
      admin: {
        ...restOfAdmin,
      },
    };
  }

  async registerAdmin(data: AdminRegisterType) {
    const [address, dni, email, name, phone, birthDate] = trimStrings(
      data.address,
      data.dni,
      data.email,
      data.name,
      data.phone,
      data.birthDate,
    );
    let {avatar} = data;

    const numberOfAdmins = await this.adminService.count();

    if (numberOfAdmins !== 0) {
      throw new BadRequest('service_disabled');
    }

    const foundAdmin = await this.adminService.getByEmail(email);

    if (foundAdmin) {
      throw new BadRequest('account_taken');
    }

    if (avatar && isString(avatar)) {
      let filename = `${name
        .toLocaleLowerCase()
        .replace(' ', '')}-${Date.now().toString()}`;
      let cloudinaryResponse = await this.cloudinaryService.upload(
        'admins',
        avatar,
        filename,
      );
      avatar = cloudinaryResponse.secure_url;
    }

    const defaultAvatar = this.avatarService.getDefaultAvatar();

    const newAdmin = await this.adminService.createAdmin({
      address,
      avatar: avatar || defaultAvatar,
      birthDate,
      dni,
      email,
      name,
      phone,
      password: data.password,
    });

    const {accessToken, refreshToken} = this.tokenService.generateTokens(
      'admin',
      {
        id: newAdmin.id,
        name: newAdmin.name,
        email: newAdmin.email,
      },
    );

    try {
      await this.adminService.updateAdminRefreshToken(
        newAdmin.id,
        refreshToken,
      );
    } catch (error) {
      console.log('error?');
      throw new InternalServerError();
    }

    const {
      password,
      refreshToken: _refreshToken,
      resetPasswordToken,
      ...restOfAdmin
    } = newAdmin;

    return {
      accessToken,
      refreshToken,
      admin: {
        ...restOfAdmin,
      },
    };
  }

  async forgotAdminPassword({email}: ForgotAdminPasswordType) {
    const admin = await this.adminService.getByEmail(email);

    if (!admin) {
      throw new Unauthorized();
    }

    const resetPasswordToken = this.tokenService.generateForgotPasswordToken(
      'admin',
      {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    );

    try {
      await this.mailService.sendEmail({
        from: '"Recuperar Contraseña ⚡" <wiwi.max.pe@gmail.com>',
        to: admin.email,
        subject: 'Recuperación de Contraseña ⚡',
        html: `<b>Clic en el siguiente enlace, o pégalo en tu navegador para completar el proceso:</b><a href="https://admin.fastly.delivery/new-password/${resetPasswordToken}" target="_blank">https://admin.fastly.delivery/new-password/${resetPasswordToken}</a>`,
      });
    } catch (error) {
      console.log('error al enviar el correo', error);
      throw new InternalServerError();
    }

    try {
      await this.adminService.updateAdminResetPasswordToken(
        admin.id,
        resetPasswordToken,
      );
    } catch (error) {
      throw new InternalServerError();
    }

    return {
      statusCode: 200,
      message: 'Verifica tu correo para resetear tu contraseña',
      success: true,
      // TODO: borrar esto, solo me servirá de prueba
      link: `https://admin.fastly.delivery/new-password/${resetPasswordToken}`,
      resetPasswordToken,
    };
  }

  async newAdminPassword({
    newPassword,
    resetPasswordToken,
  }: NewAdminPasswordType) {
    const decoded = this.tokenService.verifyForgotPasswordToken(
      'admin',
      resetPasswordToken,
    );

    const admin = await this.adminService.getByIdOrThrow(decoded.id);

    if (
      admin.resetPasswordToken &&
      admin.resetPasswordToken !== resetPasswordToken
    ) {
      throw new Unauthorized();
    }

    if (!this.passwordService.isValidPassword(newPassword)) {
      throw new BadRequest('invalid_password');
    }

    const hashedPassword = await this.passwordService.hash(newPassword);

    try {
      await this.adminService.updateAdminPassword(admin.id, hashedPassword);
    } catch (error) {
      throw new InternalServerError();
    }

    return {
      statusCode: 200,
      message: 'Password changed',
      success: true,
    };
  }

  async changeAdminPassword(
    adminId: string,
    {oldPassword, newPassword}: ChangeAdminPasswordType,
  ) {
    const admin = await this.adminService.getById(adminId);

    if (!admin) {
      throw new Unauthorized();
    }

    if (
      !this.passwordService.isValidPassword(oldPassword) ||
      !this.passwordService.isValidPassword(newPassword)
    ) {
      throw new BadRequest('invalid_password');
    }

    if (!(await this.passwordService.verify(admin.password, oldPassword))) {
      throw new Unauthorized('invalid_credentials');
    }

    const hashedPassword = await this.passwordService.hash(newPassword);

    try {
      await this.adminService.updateAdminPassword(admin.id, hashedPassword);
    } catch (error) {
      throw new InternalServerError();
    }

    return {
      statusCode: 200,
      message: 'Password changed',
      success: true,
    };
  }

  async refreshAdminToken({refreshToken}: RefreshAdminTokenType) {
    const decoded = this.tokenService.verifyRefreshToken('admin', refreshToken);

    const admin = await this.adminService.getByIdOrThrow(decoded.id);

    const accessToken = this.tokenService.generateAccessToken('admin', {
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
    const admin = await this.adminService.getByIdOrThrow(id);

    try {
      await this.adminService.updateAdminRefreshToken(admin.id, null);
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
      throw new Unauthorized('invalid_credentials');
    }

    if (
      !(await this.passwordService.verify(customer.password, data.password))
    ) {
      throw new Unauthorized('invalid_credentials');
    }

    if (customer.isBanned) {
      throw new Unauthorized('banned');
    }

    if (!customer.isActive) {
      throw new Unauthorized('inactive_account');
    }

    const {accessToken, refreshToken} = this.tokenService.generateTokens(
      'customer',
      {
        id: customer.id,
        name: customer.name,
        email: customer.email,
      },
    );

    try {
      await this.customerService.updateCustomerRefreshToken(
        customer.id,
        refreshToken,
      );
    } catch (error) {
      throw new InternalServerError();
    }

    const {
      password,
      refreshToken: _refreshToken,
      resetPasswordToken,
      ...restOfCustomer
    } = customer;

    return {
      accessToken,
      refreshToken,
      customer: {
        ...restOfCustomer,
      },
    };
  }

  async registerCustomer(data: CustomerRegisterType) {
    const [address, dni, email, name, phone, birthDate] = trimStrings(
      data.address,
      data.dni,
      data.email,
      data.name,
      data.phone,
      data.birthDate,
    );
    let {avatar} = data;

    const foundCustomer = await this.customerService.getByEmail(email);

    if (foundCustomer) {
      throw new BadRequest('account_taken');
    }

    const hashedPassword = await this.passwordService.hash(data.password);

    if (avatar && isString(avatar)) {
      let filename = `${name
        .toLocaleLowerCase()
        .replace(' ', '')}-${Date.now().toString()}`;
      let cloudinaryResponse = await this.cloudinaryService.upload(
        'customers',
        avatar,
        filename,
      );
      avatar = cloudinaryResponse.secure_url;
    }

    const defaultAvatar = this.avatarService.getDefaultAvatar();

    const newCustomer = await this.customerService.create({
      address,
      avatar: avatar || defaultAvatar,
      birthDate: new Date(birthDate),
      dni,
      email,
      name,
      phone,
      password: hashedPassword,
      isActive: false,
    });

    const {accessToken, refreshToken} = this.tokenService.generateTokens(
      'customer',
      {
        id: newCustomer.id,
        name: newCustomer.name,
        email: newCustomer.email,
      },
    );

    try {
      await this.customerService.updateCustomerRefreshToken(
        newCustomer.id,
        refreshToken,
      );
    } catch (error) {
      throw new InternalServerError();
    }

    const {
      password,
      refreshToken: _refreshToken,
      resetPasswordToken,
      ...restOfCustomer
    } = newCustomer;

    return {
      accessToken,
      refreshToken,
      customer: {
        ...restOfCustomer,
      },
    };
  }

  async forgotCustomerPassword({email}: ForgotCustomerPasswordType) {
    const customer = await this.customerService.getByEmail(email);

    if (!customer) {
      throw new Unauthorized();
    }

    const resetPasswordToken = this.tokenService.generateForgotPasswordToken(
      'customer',
      {
        id: customer.id,
        name: customer.name,
        email: customer.email,
      },
    );

    try {
      await this.mailService.sendEmail({
        from: '"Recuperar Contraseña ⚡" <wiwi.max.pe@gmail.com>',
        to: customer.email,
        subject: 'Recuperación de Contraseña ⚡',
        html: `<b>Clic en el siguiente enlace, o pégalo en tu navegador para completar el proceso:</b><a href="https://customer.fastly.delivery/new-password/${resetPasswordToken}" target="_blank">https://customer.fastly.delivery/new-password/${resetPasswordToken}</a>`,
      });
    } catch (error) {
      console.log('error al enviar el correo', error);
      throw new InternalServerError();
    }

    try {
      await this.customerService.updateCustomerResetPasswordToken(
        customer.id,
        resetPasswordToken,
      );
    } catch (error) {
      throw new InternalServerError();
    }

    return {
      statusCode: 200,
      message: 'Verifica tu correo para resetear tu contraseña',
      success: true,
      // TODO: borrar esto, solo me servirá de prueba
      link: `https://customer.fastly.delivery/new-password/${resetPasswordToken}`,
      resetPasswordToken,
    };
  }

  async newCustomerPassword({
    newPassword,
    resetPasswordToken,
  }: NewCustomerPasswordType) {
    const decoded = this.tokenService.verifyForgotPasswordToken(
      'customer',
      resetPasswordToken,
    );

    const customer = await this.customerService.getByIdOrThrow(decoded.id);

    if (
      customer.resetPasswordToken &&
      customer.resetPasswordToken !== resetPasswordToken
    ) {
      throw new Unauthorized();
    }

    const hashedPassword = await this.passwordService.hash(newPassword);

    try {
      await this.customerService.updateCustomerPassword(
        customer.id,
        hashedPassword,
      );
    } catch (error) {
      throw new InternalServerError();
    }

    return {
      statusCode: 200,
      message: 'Password changed',
      success: true,
    };
  }

  async changeCustomerPassword(
    customerId: string,
    {oldPassword, newPassword}: ChangeCustomerPasswordType,
  ) {
    const customer = await this.customerService.getById(customerId);

    if (!customer) {
      throw new Unauthorized();
    }

    if (!(await this.passwordService.verify(customer.password, oldPassword))) {
      throw new Unauthorized('invalid_credentials');
    }

    const hashedPassword = await this.passwordService.hash(newPassword);

    try {
      await this.customerService.updateCustomerPassword(
        customer.id,
        hashedPassword,
      );
    } catch (error) {
      throw new InternalServerError();
    }

    return {
      statusCode: 200,
      message: 'Password changed',
      success: true,
    };
  }

  async refreshCustomerToken({refreshToken}: RefreshCustomerTokenType) {
    const decoded = this.tokenService.verifyRefreshToken(
      'customer',
      refreshToken,
    );

    const customer = await this.customerService.getByIdOrThrow(decoded.id);

    const accessToken = this.tokenService.generateAccessToken('customer', {
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
    const customer = await this.customerService.getByIdOrThrow(id);

    try {
      customer.refreshToken = null;
      await this.customerService.updateCustomerRefreshToken(customer.id, null);
    } catch (error) {
      console.log(error);
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
      throw new Unauthorized('invalid_credentials');
    }

    if (!(await this.passwordService.verify(dealer.password, data.password))) {
      throw new Unauthorized('invalid_credentials');
    }

    if (dealer.isBanned) {
      throw new Unauthorized('banned');
    }

    if (!dealer.isActive) {
      throw new Unauthorized('inactive_account');
    }

    const {accessToken, refreshToken} = this.tokenService.generateTokens(
      'dealer',
      {
        id: dealer.id,
        name: dealer.name,
        email: dealer.email,
      },
    );

    try {
      await this.dealerService.updateDealerRefreshToken(
        dealer.id,
        refreshToken,
      );
    } catch (error) {
      throw new InternalServerError();
    }

    const {
      password,
      refreshToken: _refreshToken,
      resetPasswordToken,
      ...restOfDealer
    } = dealer;

    return {
      accessToken,
      refreshToken,
      dealer: {
        ...restOfDealer,
      },
    };
  }

  async registerDealer(data: DealerRegisterType) {
    const [address, dni, email, name, phone, birthDate] = trimStrings(
      data.address,
      data.dni,
      data.email,
      data.name,
      data.phone,
      data.birthDate,
    );
    let {avatar} = data;

    const foundDealer = await this.dealerService.getByEmail(email);

    if (foundDealer) {
      throw new BadRequest('account_taken');
    }

    const hashedPassword = await this.passwordService.hash(data.password);

    if (avatar && isString(avatar)) {
      let filename = `${name
        .toLocaleLowerCase()
        .replace(' ', '')}-${Date.now().toString()}`;
      let cloudinaryResponse = await this.cloudinaryService.upload(
        'dealers',
        avatar,
        filename,
      );
      avatar = cloudinaryResponse.secure_url;
    }

    const defaultAvatar = this.avatarService.getDefaultAvatar();

    const newDealer = await this.dealerService.create({
      address,
      avatar: avatar || defaultAvatar,
      birthDate: new Date(birthDate),
      dni,
      email,
      name,
      phone,
      password: hashedPassword,
      isActive: false,
    });

    const {accessToken, refreshToken} = this.tokenService.generateTokens(
      'dealer',
      {
        id: newDealer.id,
        name: newDealer.name,
        email: newDealer.email,
      },
    );

    try {
      await this.dealerService.updateDealerRefreshToken(
        newDealer.id,
        refreshToken,
      );
    } catch (error) {
      throw new InternalServerError();
    }

    const {
      password,
      refreshToken: _refreshToken,
      resetPasswordToken,
      ...restOfDealer
    } = newDealer;

    return {
      accessToken,
      refreshToken,
      dealer: {
        ...restOfDealer,
      },
    };
  }

  async forgotDealerPassword({email}: ForgotDealerPasswordType) {
    const dealer = await this.dealerService.getByEmail(email);

    if (!dealer) {
      throw new Unauthorized('account_not_found');
    }

    const resetPasswordToken = this.tokenService.generateForgotPasswordToken(
      'dealer',
      {
        id: dealer.id,
        name: dealer.name,
        email: dealer.email,
      },
    );

    try {
      await this.mailService.sendEmail({
        from: '"Recuperar Contraseña ⚡" <wiwi.max.pe@gmail.com>',
        to: dealer.email,
        subject: 'Recuperación de Contraseña ⚡',
        html: `<b>Clic en el siguiente enlace, o pégalo en tu navegador para completar el proceso:</b><a href="https://dealer.fastly.delivery/new-password/${resetPasswordToken}" target="_blank">https://dealer.fastly.delivery/new-password/${resetPasswordToken}</a>`,
      });
    } catch (error) {
      console.log('error al enviar el correo', error);
      throw new InternalServerError();
    }

    try {
      await this.dealerService.updateDealerResetPasswordToken(
        dealer.id,
        resetPasswordToken,
      );
    } catch (error) {
      throw new InternalServerError();
    }

    return {
      statusCode: 200,
      message: 'Verifica tu correo para resetear tu contraseña.',
      success: true,
      // link: `https://dealer.fastly.delivery/new-password/${resetPasswordToken}`,
      // resetPasswordToken,
    };
  }

  async newDealerPassword({
    newPassword,
    resetPasswordToken,
  }: NewDealerPasswordType) {
    const decoded = this.tokenService.verifyForgotPasswordToken(
      'dealer',
      resetPasswordToken,
    );

    const dealer = await this.dealerService.getByIdOrThrow(decoded.id);

    if (
      dealer.resetPasswordToken &&
      dealer.resetPasswordToken !== resetPasswordToken
    ) {
      throw new Unauthorized();
    }

    const hashedPassword = await this.passwordService.hash(newPassword);

    try {
      await this.dealerService.updateDealerPassword(dealer.id, hashedPassword);
    } catch (error) {
      throw new InternalServerError();
    }

    return {
      statusCode: 200,
      message: 'Password changed',
      success: true,
    };
  }

  async changeDealerPassword(
    dealerId: string,
    {oldPassword, newPassword}: ChangeDealerPasswordType,
  ) {
    const dealer = await this.dealerService.getById(dealerId);

    if (!dealer) {
      throw new Unauthorized();
    }

    if (!(await this.passwordService.verify(dealer.password, oldPassword))) {
      throw new Unauthorized('invalid_credentials');
    }

    const hashedPassword = await this.passwordService.hash(newPassword);

    try {
      await this.dealerService.updateDealerPassword(dealer.id, hashedPassword);
    } catch (error) {
      throw new InternalServerError();
    }

    return {
      statusCode: 200,
      message: 'Password changed',
      success: true,
    };
  }

  async refreshDealerToken({refreshToken}: RefreshDealerTokenType) {
    const decoded = this.tokenService.verifyRefreshToken(
      'dealer',
      refreshToken,
    );

    const dealer = await this.dealerService.getByIdOrThrow(decoded.id);

    const accessToken = this.tokenService.generateAccessToken('dealer', {
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
    const dealer = await this.dealerService.getByIdOrThrow(id);

    try {
      await this.dealerService.updateDealerRefreshToken(dealer.id, null);
    } catch (error) {
      console.log(error);
      throw new InternalServerError();
    }

    return {
      statusCode: 200,
      success: true,
    };
  }
}
