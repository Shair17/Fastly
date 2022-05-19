import { Controller, POST as Post } from 'fastify-decorators';
import { AuthService } from './auth.service';
import { Request, Reply } from '../../interfaces/http.interfaces';
import {
	hasBearerToken,
	adminIsAuthenticated,
	customerIsAuthenticated,
	dealerIsAuthenticated,
	userIsAuthenticated,
} from '../../shared/hooks/auth.hook';
import {
	LogInWithFacebook,
	LogInWithFacebookType,
	AdminLogin,
	AdminLoginType,
	AdminRegister,
	AdminRegisterType,
	ChangeAdminPassword,
	ChangeAdminPasswordType,
	CustomerLogin,
	CustomerLoginType,
	CustomerRegister,
	CustomerRegisterType,
	ChangeCustomerPassword,
	ChangeCustomerPasswordType,
	DealerLogin,
	DealerLoginType,
	DealerRegister,
	DealerRegisterType,
	ChangeDealerPassword,
	ChangeDealerPasswordType,
} from './auth.schema';

@Controller('/auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('/facebook', {
		schema: {
			body: LogInWithFacebook,
		},
	})
	async logInWithFacebook(
		request: Request<{
			Body: LogInWithFacebookType;
		}>,
		reply: Reply
	) {
		const { accessToken, userID } = request.body;

		return this.authService.logInWithFacebook({ accessToken, userID });
	}

	@Post('/facebook/refresh', {
		schema: {
			body: {},
		},
	})
	async refreshFacebookTokens(request: Request, reply: Reply) {
		return this.authService.refreshFacebookTokens();
	}

	@Post('/facebook/logout', {
		schema: {
			body: {},
		},
		onRequest: [hasBearerToken, userIsAuthenticated],
	})
	async logOutFromFacebook(request: Request, reply: Reply) {
		return this.authService.logOutFromFacebook();
	}

	@Post('/admin/login', {
		schema: {
			body: AdminLogin,
		},
	})
	async logInAdmin(
		request: Request<{
			Body: AdminLoginType;
		}>,
		reply: Reply
	) {
		const { email, password } = request.body;

		return this.authService.logInAdmin({ email, password });
	}

	@Post('/admin/register', {
		schema: {
			body: AdminRegister,
		},
	})
	async registerAdmin(
		request: Request<{
			Body: AdminRegisterType;
		}>,
		reply: Reply
	) {
		return this.authService.registerAdmin(request.body);
	}

	@Post('/admin/change-password', {
		schema: {
			body: ChangeAdminPassword,
		},
		onRequest: [hasBearerToken, adminIsAuthenticated],
	})
	async changeAdminPassword(
		request: Request<{
			Body: ChangeAdminPasswordType;
		}>,
		reply: Reply
	) {
		return this.authService.changeAdminPassword(request.adminId, request.body);
	}

	@Post('/admin/refresh', {
		schema: {
			body: {},
		},
	})
	async refreshAdminTokens(request: Request, reply: Reply) {
		return this.authService.refreshAdminTokens();
	}

	@Post('/admin/logout', {
		schema: {
			body: {},
		},
		onRequest: [hasBearerToken, adminIsAuthenticated],
	})
	async logOutAdmin(request: Request, reply: Reply) {
		return this.authService.logOutAdmin();
	}

	@Post('/customer/login', {
		schema: {
			body: CustomerLogin,
		},
	})
	async loginCustomer(
		request: Request<{
			Body: CustomerLoginType;
		}>,
		reply: Reply
	) {
		const { email, password } = request.body;

		return this.authService.loginCustomer({ email, password });
	}

	@Post('/customer/register', {
		schema: {
			body: CustomerRegister,
		},
	})
	async registerCustomer(
		request: Request<{
			Body: CustomerRegisterType;
		}>,
		reply: Reply
	) {
		// return this.authService.registerCustomer({});
		return 'ok';
	}

	@Post('/customer/change-password', {
		schema: {
			body: ChangeCustomerPassword,
		},
		onRequest: [hasBearerToken, customerIsAuthenticated],
	})
	async changeCustomerPassword(
		request: Request<{
			Body: ChangeCustomerPasswordType;
		}>,
		reply: Reply
	) {
		return this.authService.changeCustomerPassword(
			request.customerId,
			request.body
		);
	}

	@Post('/customer/refresh', {
		schema: {
			body: {},
		},
	})
	async refreshCustomerTokens(request: Request, reply: Reply) {
		return this.authService.refreshCustomerTokens();
	}

	@Post('/customer/logout', {
		schema: {
			body: {},
		},
		onRequest: [hasBearerToken, customerIsAuthenticated],
	})
	async logOutCustomer(request: Request, reply: Reply) {
		return this.authService.logOutCustomer();
	}

	@Post('/dealer/login', {
		schema: {
			body: DealerLogin,
		},
	})
	async loginDealer(
		request: Request<{
			Body: DealerLoginType;
		}>,
		reply: Reply
	) {
		const { email, password } = request.body;

		return this.authService.loginDealer({ email, password });
	}

	@Post('/dealer/register', {
		schema: {
			body: DealerRegister,
		},
	})
	async registerDealer(
		request: Request<{
			Body: DealerRegisterType;
		}>,
		reply: Reply
	) {
		// return this.authService.registerDealer();
		return 'ok';
	}

	@Post('/dealer/change-password', {
		schema: {
			body: ChangeDealerPassword,
		},
		onRequest: [hasBearerToken, dealerIsAuthenticated],
	})
	async changeDealerPassword(
		request: Request<{
			Body: ChangeDealerPasswordType;
		}>,
		reply: Reply
	) {
		return this.authService.changeDealerPassword(
			request.dealerId,
			request.body
		);
	}

	@Post('/dealer/refresh', {
		schema: {
			body: {},
		},
	})
	async refreshDealerTokens(request: Request, reply: Reply) {
		return this.authService.refreshDealerTokens();
	}

	@Post('/dealer/logout', {
		schema: {
			body: {},
		},
		onRequest: [hasBearerToken, dealerIsAuthenticated],
	})
	async logOutDealer(request: Request, reply: Reply) {
		return this.authService.logOutDealer();
	}
}
