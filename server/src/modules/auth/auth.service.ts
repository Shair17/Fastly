import { Service } from 'fastify-decorators';
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
} from './auth.schema';
import { HttpService } from '../../shared/services/http.service';
import { PasswordService } from '../../shared/services/password.service';
import { trimStrings } from '../../utils/trimStrings';
import { UserService } from '../user/user.service';
import { AdminService } from '../admin/admin.service';
import { buildFacebookUri } from '../../utils/buildFacebookUri';
import { FacebookGraphApiResponse } from './dto/facebookGraphApiResponse.dto';
import {
	Unauthorized,
	NotFound,
	BadRequest,
	InternalServerError,
} from 'http-errors';
import { CustomerService } from '../customer/customer.service';
import { DealerService } from '../dealer/dealer.service';
import { TokenService } from '../../shared/services/token.service';

@Service()
export class AuthService {
	constructor(
		private readonly httpService: HttpService,
		private readonly userService: UserService,
		private readonly adminService: AdminService,
		private readonly customerService: CustomerService,
		private readonly dealerService: DealerService,
		private readonly tokenService: TokenService,
		private readonly passwordService: PasswordService
	) {}

	async logInWithFacebook(data: LogInWithFacebookType) {
		let facebookId: string = '',
			name: string = '';

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
			throw new NotFound('data_not_found');
		}

		if (facebookUserID === facebookId) {
			console.log(
				'el userID proporcionado por el frontend y el obtenido por el backend son los mismos, coinciden, lo dejamos pasar'
			);
		}

		const user = await this.userService.getByFacebookUserID(facebookId);

		// El usuario ya tiene una cuenta, entonces procedemos a verificar si está baneado y/o tiene direcciones
		if (user !== null) {
			// falta agregar addresses (direcciones), hacerlo luego
			// TODO -> AGREGAR DIRECCIONES
			const { id, isBanned, banReason } = user;

			if (isBanned) {
				console.log('usuario baneado');
				console.log('benado?', isBanned, 'razón:', banReason);
				throw new Unauthorized('banned');
			}

			const tokens = this.tokenService.generateTokens('user');

			// TODO también devolver datos del usuario
			return tokens;
		}

		// El usuario es nuevo, vamos a crear uno!
		// comprobar luego los datos que guardo y recibo!!
		const newUser = await this.userService.save({
			facebookId,
			facebookAccessToken,
			name,
		});

		// const tokens = await this.tokensService.generateTokens('user', {
		// 	userId: newUser.id,
		// });
		const tokens = this.tokenService.generateTokens('user');

		// TODO también devolver datos del usuario
		return tokens;
	}

	async refreshFacebookTokens() {}

	async logOutFromFacebook() {}

	async logInAdmin(data: AdminLoginType) {
		const [email] = trimStrings(data.email);

		const admin = await this.adminService.getByEmail(email);

		if (!admin) {
			console.log('no hay el admin');
			throw new Unauthorized('invalid_credentials');
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

		const tokens = this.tokenService.generateTokens('admin');

		// TODO también devolver datos del admin
		return tokens;
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
			throw new BadRequest('service_disabled');
		}

		const foundAdmin = await this.adminService.getByEmail(email);

		if (foundAdmin) {
			throw new BadRequest('account_taken');
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

		const tokens = this.tokenService.generateTokens('admin');

		// TODO también devolver datos del admin
		return tokens;
	}

	async forgotAdminPassword({ email }: ForgotAdminPasswordType) {
		const admin = await this.adminService.getByEmail(email);

		if (!admin) {
			throw new BadRequest();
		}

		const resetPasswordToken = this.tokenService.generateForgotPasswordToken(
			'admin',
			{
				id: admin.id,
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
	}

	async newAdminPassword(data: NewAdminPasswordType) {}

	async changeAdminPassword(
		adminId: string,
		{ oldPassword, newPassword }: ChangeAdminPasswordType
	) {
		const admin = await this.adminService.getById(adminId);

		if (!admin) {
			throw new Unauthorized();
		}

		if (!(await this.passwordService.verify(admin.password, oldPassword))) {
			throw new Unauthorized('invalid_credentials');
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
			message: 'Password changed',
			success: true,
		};
	}

	async refreshAdminTokens() {}

	async logOutAdmin() {}

	async loginCustomer(data: CustomerLoginType) {
		const [email] = trimStrings(data.email);

		const customer = await this.customerService.getByEmail(email);

		if (!customer) {
			console.log('no hay el customer');
			throw new Unauthorized('invalid_credentials');
		}

		if (
			!(await this.passwordService.verify(customer.password, data.password))
		) {
			console.log('contraseña incorrecta del customer');
			throw new Unauthorized('invalid_credentials');
		}

		if (customer.isBanned) {
			throw new Unauthorized('banned');
		}

		if (!customer.isActive) {
			throw new Unauthorized('inactive_account');
		}

		const tokens = this.tokenService.generateTokens('customer');

		// TODO también devolver datos del customer
		return tokens;
	}

	async registerCustomer(data: CustomerRegisterType) {
		const [] = trimStrings();

		const tokens = this.tokenService.generateTokens('customer');

		// TODO también devolver datos del usuario
		return tokens;
	}

	async forgotCustomerPassword({ email }: ForgotCustomerPasswordType) {
		const customer = await this.customerService.getByEmail(email);

		if (!customer) {
			throw new BadRequest();
		}

		const token = this.tokenService.generateForgotPasswordToken('customer', {
			id: customer.id,
			email: customer.email,
		});
	}

	async newCustomerPassword(data: NewCustomerPasswordType) {}

	async changeCustomerPassword(
		customerId: string,
		{ oldPassword, newPassword }: ChangeCustomerPasswordType
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
			await this.customerService.save({
				...customer,
				password: hashedPassword,
			});
		} catch (error) {
			throw new InternalServerError();
		}

		return {
			statusCode: 200,
			message: 'Password changed',
			success: true,
		};
	}

	async refreshCustomerTokens() {}

	async logOutCustomer() {}

	async loginDealer(data: DealerLoginType) {
		const [email] = trimStrings(data.email);

		const dealer = await this.dealerService.getByEmail(email);

		if (!dealer) {
			console.log('no hay el dealer');
			throw new Unauthorized('invalid_credentials');
		}

		if (!(await this.passwordService.verify(dealer.password, data.password))) {
			console.log('contraseña incorrecta del dealer');
			throw new Unauthorized('invalid_credentials');
		}

		if (dealer.isBanned) {
			throw new Unauthorized('banned');
		}

		if (!dealer.isActive) {
			throw new Unauthorized('inactive_account');
		}

		const tokens = this.tokenService.generateTokens('dealer');

		// TODO también devolver datos del usuario
		return tokens;
	}

	async registerDealer(data: DealerRegisterType) {
		const [address, birthDate, dni, email, name, phone] = trimStrings(
			data.address,
			data.birthDate,
			data.dni,
			data.email,
			data.name,
			data.phone
		);

		const tokens = this.tokenService.generateTokens('dealer');

		// TODO también devolver datos del usuario
		return tokens;
	}

	async forgotDealerPassword({ email }: ForgotDealerPasswordType) {
		const dealer = await this.dealerService.getByEmail(email);

		if (!dealer) {
			throw new BadRequest();
		}

		const token = this.tokenService.generateForgotPasswordToken('dealer', {
			id: dealer.id,
			email: dealer.email,
		});
	}

	async newDealerPassword(data: NewDealerPasswordType) {}

	async changeDealerPassword(
		dealerId: string,
		{ oldPassword, newPassword }: ChangeDealerPasswordType
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
			await this.dealerService.save({
				...dealer,
				password: hashedPassword,
			});
		} catch (error) {
			throw new InternalServerError();
		}

		return {
			statusCode: 200,
			message: 'Password changed',
			success: true,
		};
	}

	async refreshDealerTokens() {}

	async logOutDealer() {}
}
