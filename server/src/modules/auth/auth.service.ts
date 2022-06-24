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
	RefreshFacebookTokenType,
	RefreshAdminTokenType,
	RefreshCustomerTokenType,
	RefreshDealerTokenType,
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
import { MailService } from '../../shared/services/mail.service';
import { User } from '../user/user.entity';

/**
 * TODO: Probar la lib ´dayjs´ para manejar las fechas
 */

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

		if (facebookUserID !== facebookId) {
			throw new Unauthorized();
		}

		const user = await this.userService.getByFacebookUserID(facebookId);

		if (user !== null) {
			if (user.isBanned) {
				console.log('usuario baneado');
				console.log(
					'benado?',
					user.isBanned ? 'si' : 'no',
					'razón:',
					user.banReason
				);
				throw new Unauthorized('banned');
			}

			let payload: { id: string; name: string; email?: string } = {
				id: user.id,
				name: user.name,
			};

			if (user.email) {
				payload = {
					...payload,
					email: user.email,
				};
			}

			const { accessToken, refreshToken } = this.tokenService.generateTokens(
				'user',
				payload
			);

			try {
				user.refreshToken = refreshToken;

				await this.userService.save(user);
			} catch (error) {
				console.log(error);
				throw new InternalServerError();
			}

			const {
				checkIsNewUser,
				facebookAccessToken,
				refreshToken: userRefreshToken,
				...restOfUser
			} = user;

			return {
				accessToken,
				refreshToken,
				user: {
					...restOfUser,
				},
			};
		}

		// El usuario es nuevo, vamos a crear uno
		// const newUser = await this.userService.save({
		// 	facebookId,
		// 	facebookAccessToken,
		// 	name,
		// });
		const _newUser = new User();
		_newUser.facebookId = facebookId;
		_newUser.facebookAccessToken = facebookAccessToken;
		_newUser.name = name;

		const newUser = await this.userService.save(_newUser);

		let payload: { id: string; name: string; email?: string } = {
			id: newUser.id,
			name: newUser.name,
		};

		if (newUser.email) {
			payload = {
				...payload,
				email: newUser.email,
			};
		}

		const { accessToken, refreshToken } = this.tokenService.generateTokens(
			'user',
			payload
		);

		try {
			newUser.refreshToken = refreshToken;

			await this.userService.save(newUser);
		} catch (error) {
			throw new InternalServerError();
		}

		const {
			checkIsNewUser,
			facebookAccessToken: newUserFacebookAccessToken,
			refreshToken: newUserRefreshToken,
			...restOfNewUser
		} = newUser;

		return {
			accessToken,
			refreshToken,
			user: {
				...restOfNewUser,
			},
		};
	}

	async refreshFacebookToken({ refreshToken }: RefreshFacebookTokenType) {
		const decoded = this.tokenService.verifyRefreshToken('user', refreshToken);

		const user = await this.userService.getById(decoded.id);

		if (!user) {
			throw new Unauthorized();
		}

		let payload: { id: string; name: string; email?: string } = {
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
		const user = await this.userService.getById(id);

		if (!user) {
			throw new BadRequest();
		}

		try {
			user.refreshToken = null;

			await this.userService.save(user);
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

		if (!(await this.passwordService.verify(admin.password, data.password))) {
			throw new Unauthorized('invalid_credentials');
		}

		if (admin.isBanned) {
			throw new Unauthorized('banned');
		}

		if (!admin.isActive) {
			throw new Unauthorized('inactive_account');
		}

		const { accessToken, refreshToken } = this.tokenService.generateTokens(
			'admin',
			{
				id: admin.id,
				name: admin.name,
				email: admin.email,
			}
		);

		try {
			admin.refreshToken = refreshToken;
			await this.adminService.save(admin);
		} catch (error) {
			throw new InternalServerError();
		}

		const {
			password,
			refreshToken: _refreshToken,
			resetPasswordToken,
			calcUserAge,
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

		const newAdmin = await this.adminService.createAdmin({
			address,
			avatar: data.avatar,
			birthDate,
			dni,
			email,
			name,
			phone,
			password: data.password,
		});

		const { accessToken, refreshToken } = this.tokenService.generateTokens(
			'admin',
			{
				id: newAdmin.id,
				name: newAdmin.name,
				email: newAdmin.email,
			}
		);

		try {
			newAdmin.refreshToken = refreshToken;
			await this.adminService.save(newAdmin);
		} catch (error) {
			console.log('error?');
			throw new InternalServerError();
		}

		const {
			password,
			refreshToken: _refreshToken,
			resetPasswordToken,
			calcUserAge,
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

	async forgotAdminPassword({ email }: ForgotAdminPasswordType) {
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
			}
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
			admin.resetPasswordToken = resetPasswordToken;

			await this.adminService.save(admin);
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
			resetPasswordToken
		);

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
			admin.password = hashedPassword;

			await this.adminService.save(admin);
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
			admin.password = hashedPassword;

			await this.adminService.save(admin);
		} catch (error) {
			throw new InternalServerError();
		}

		return {
			statusCode: 200,
			message: 'Password changed',
			success: true,
		};
	}

	async refreshAdminToken({ refreshToken }: RefreshAdminTokenType) {
		const decoded = this.tokenService.verifyRefreshToken('admin', refreshToken);

		const admin = await this.adminService.getById(decoded.id);

		if (!admin) {
			throw new Unauthorized();
		}

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
		const admin = await this.adminService.getById(id);

		if (!admin) {
			throw new Unauthorized();
		}

		try {
			admin.refreshToken = null;

			await this.adminService.save(admin);
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

		const { accessToken, refreshToken } = this.tokenService.generateTokens(
			'customer',
			{
				id: customer.id,
				name: customer.name,
				email: customer.email,
			}
		);

		try {
			customer.refreshToken = refreshToken;

			await this.customerService.save(customer);
		} catch (error) {
			throw new InternalServerError();
		}

		const {
			password,
			refreshToken: _refreshToken,
			resetPasswordToken,
			calcUserAge,
			stores,
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
			data.birthDate
		);

		const foundCustomer = await this.customerService.getByEmail(email);

		if (foundCustomer) {
			throw new BadRequest('account_taken');
		}

		const hashedPassword = await this.passwordService.hash(data.password);

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
			'customer',
			{
				id: newCustomer.id,
				name: newCustomer.name,
				email: newCustomer.email,
			}
		);

		try {
			newCustomer.refreshToken = refreshToken;

			await this.customerService.save(newCustomer);
		} catch (error) {
			throw new InternalServerError();
		}

		const {
			password,
			refreshToken: _refreshToken,
			resetPasswordToken,
			calcUserAge,
			stores,
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

	async forgotCustomerPassword({ email }: ForgotCustomerPasswordType) {
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
			}
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
			customer.resetPasswordToken = resetPasswordToken;

			await this.customerService.save(customer);
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
			resetPasswordToken
		);

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
			customer.password = hashedPassword;

			await this.customerService.save(customer);
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
			customer.password = hashedPassword;

			await this.customerService.save(customer);
		} catch (error) {
			throw new InternalServerError();
		}

		return {
			statusCode: 200,
			message: 'Password changed',
			success: true,
		};
	}

	async refreshCustomerToken({ refreshToken }: RefreshCustomerTokenType) {
		const decoded = this.tokenService.verifyRefreshToken(
			'customer',
			refreshToken
		);

		const customer = await this.customerService.getById(decoded.id);

		if (!customer) {
			throw new Unauthorized();
		}

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
		const customer = await this.customerService.getById(id);

		if (!customer) {
			throw new Unauthorized();
		}

		try {
			customer.refreshToken = null;

			await this.customerService.save(customer);
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

		const { accessToken, refreshToken } = this.tokenService.generateTokens(
			'dealer',
			{
				id: dealer.id,
				name: dealer.name,
				email: dealer.email,
			}
		);

		try {
			dealer.refreshToken = refreshToken;

			await this.dealerService.save(dealer);
		} catch (error) {
			throw new InternalServerError();
		}

		const {
			password,
			refreshToken: _refreshToken,
			resetPasswordToken,
			calcUserAge,
			calcDealerRanking,
			rankings,
			vehicle,
			orders,
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
			data.birthDate
		);

		const foundDealer = await this.dealerService.getByEmail(email);

		if (foundDealer) {
			throw new BadRequest('account_taken');
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
			'dealer',
			{
				id: newDealer.id,
				name: newDealer.name,
				email: newDealer.email,
			}
		);

		try {
			newDealer.refreshToken = refreshToken;

			await this.dealerService.save(newDealer);
		} catch (error) {
			throw new InternalServerError();
		}

		const {
			password,
			refreshToken: _refreshToken,
			resetPasswordToken,
			calcUserAge,
			calcDealerRanking,
			rankings,
			vehicle,
			orders,
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

	async forgotDealerPassword({ email }: ForgotDealerPasswordType) {
		const dealer = await this.dealerService.getByEmail(email);

		if (!dealer) {
			throw new Unauthorized();
		}

		const resetPasswordToken = this.tokenService.generateForgotPasswordToken(
			'dealer',
			{
				id: dealer.id,
				name: dealer.name,
				email: dealer.email,
			}
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
			dealer.resetPasswordToken = resetPasswordToken;

			await this.dealerService.save(dealer);
		} catch (error) {
			throw new InternalServerError();
		}

		return {
			statusCode: 200,
			message: 'Verifica tu correo para resetear tu contraseña',
			success: true,
			// TODO: borrar esto, solo me servirá de prueba
			link: `https://dealer.fastly.delivery/new-password/${resetPasswordToken}`,
			resetPasswordToken,
		};
	}

	async newDealerPassword({
		newPassword,
		resetPasswordToken,
	}: NewDealerPasswordType) {
		const decoded = this.tokenService.verifyForgotPasswordToken(
			'dealer',
			resetPasswordToken
		);

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
			dealer.password = hashedPassword;

			await this.dealerService.save(dealer);
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
			dealer.password = hashedPassword;

			await this.dealerService.save(dealer);
		} catch (error) {
			throw new InternalServerError();
		}

		return {
			statusCode: 200,
			message: 'Password changed',
			success: true,
		};
	}

	async refreshDealerToken({ refreshToken }: RefreshDealerTokenType) {
		const decoded = this.tokenService.verifyRefreshToken(
			'dealer',
			refreshToken
		);

		const dealer = await this.dealerService.getById(decoded.id);

		if (!dealer) {
			throw new Unauthorized();
		}

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
		const dealer = await this.dealerService.getById(id);

		if (!dealer) {
			throw new BadRequest();
		}

		try {
			dealer.refreshToken = null;

			await this.dealerService.save(dealer);
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
