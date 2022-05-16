import { Controller, POST as Post } from 'fastify-decorators';
import { AuthService } from './auth.service';
import { Request, Reply } from '../../interfaces/http.interfaces';
import {
	LogInWithFacebook,
	LogInWithFacebookType,
	CommonUserLogin,
	CommonUserLoginType,
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
	})
	async logOutFromFacebook(request: Request, reply: Reply) {
		return this.authService.logOutFromFacebook();
	}

	@Post('/admin/login', {
		schema: {
			body: CommonUserLogin,
		},
	})
	async logInAdmin(
		request: Request<{
			Body: CommonUserLoginType;
		}>,
		reply: Reply
	) {
		const { email, password } = request.body;

		return this.authService.logInAdmin({ email, password });
	}

	@Post('/admin/register', {
		schema: {
			body: {},
		},
	})
	async registerAdmin(request: Request, reply: Reply) {
		return this.authService.registerAdmin();
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
	})
	async logOutAdmin(request: Request, reply: Reply) {
		return this.authService.logOutAdmin();
	}

	@Post('/customer/login', {
		schema: {
			body: CommonUserLogin,
		},
	})
	async loginCustomer(
		request: Request<{
			Body: CommonUserLoginType;
		}>,
		reply: Reply
	) {
		const { email, password } = request.body;

		return this.authService.loginCustomer({ email, password });
	}

	@Post('/customer/register', {
		schema: {
			body: {},
		},
	})
	async registerCustomer(request: Request, reply: Reply) {
		return this.authService.registerCustomer();
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
	})
	async logOutCustomer(request: Request, reply: Reply) {
		return this.authService.logOutCustomer();
	}

	@Post('/dealer/login', {
		schema: {
			body: CommonUserLogin,
		},
	})
	async loginDealer(
		request: Request<{
			Body: CommonUserLoginType;
		}>,
		reply: Reply
	) {
		const { email, password } = request.body;

		return this.authService.loginDealer({ email, password });
	}

	@Post('/dealer/register', {
		schema: {
			body: {},
		},
	})
	async registerDealer(request: Request, reply: Reply) {
		return this.authService.registerDealer();
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
	})
	async logOutDealer(request: Request, reply: Reply) {
		return this.authService.logOutDealer();
	}
}
