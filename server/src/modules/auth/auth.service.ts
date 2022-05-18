import { Service } from 'fastify-decorators';
import {
	LogInWithFacebookType,
	AdminLoginType,
	AdminRegisterType,
	CustomerLoginType,
	CustomerRegisterType,
	DealerLoginType,
	DealerRegisterType,
} from './auth.schema';
import { HttpService } from '../../shared/services/http.service';
import { PasswordService } from '../../shared/services/password.service';
import { trimStrings } from '../../utils/trimStrings';
import { UserService } from '../user/user.service';
import { AdminService } from '../admin/admin.service';
import { buildFacebookUri } from '../../utils/buildFacebookUri';
import { FacebookGraphApiResponse } from './dto/facebookGraphApiResponse.dto';
import { Unauthorized, NotFound, BadRequest } from 'http-errors';
import { CustomerService } from '../customer/customer.service';
import { DealerService } from '../dealer/dealer.service';
import { TokenService } from '../../shared/services/token.service';
import { validate } from 'class-validator';

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
			console.log('data not found');
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

			// retornar tokens {accessToken, refreshToken}
			return {};
		}

		// El usuario es nuevo, vamos a crear uno!
		// comprobar luego los datos que guardo y recibo!!
		const newUser = await this.userService.save({
			facebookId,
			facebookAccessToken,
			name,
		});

		// crear los tokens
		// const tokens = await this.tokensService.generateTokens('user', {
		// 	userId: newUser.id,
		// });

		// retornar tokens
		// y si es un nuevo usuario
		return {};
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

		// retornar tokens

		return {};
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

		// new Date("11/29/2001")

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

		// crear tokens y devolverlos

		return {
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

		// Devolver tokens

		return {};
	}

	async registerCustomer(data: CustomerRegisterType) {
		const [] = trimStrings();

		return {};
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

		// Devolver tokens

		return {};
	}

	async registerDealer(data: DealerRegisterType) {
		return {};
	}

	async refreshDealerTokens() {}

	async logOutDealer() {}
}
