import { Controller, POST as Post } from 'fastify-decorators';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('/facebook')
	async logInWithFacebook() {
		return 'facebook';
	}

	@Post('/facebook/refresh')
	async refreshFacebookTokens() {
		return 'facebook refresh';
	}

	@Post('/facebook/logout')
	async logOutFromFacebook() {
		return 'logout facebook';
	}

	@Post('/admin/login')
	async logInAdmin() {
		return 'admin login';
	}

	@Post('/admin/register')
	async registerAdmin() {
		return 'admin register';
	}

	@Post('/admin/refresh')
	async refreshAdminTokens() {
		return 'admin refresh';
	}

	@Post('/admin/logout')
	async logOutAdmin() {
		return 'logout admin';
	}

	@Post('/customer/login')
	async loginCustomer() {
		return 'customer login';
	}

	@Post('/customer/register')
	async registerCustomer() {
		return 'customer register';
	}

	@Post('/customer/refresh')
	async refreshCustomerTokens() {
		return 'customer refresh';
	}

	@Post('/customer/logout')
	async logOutCustomer() {
		return 'logout customer';
	}

	@Post('/dealer/login')
	async loginDealer() {
		return 'dealer login';
	}

	@Post('/dealer/register')
	async registerDealer() {
		return 'dealer register';
	}

	@Post('/dealer/refresh')
	async refreshDealerTokens() {
		return 'dealer refresh';
	}

	@Post('/dealer/logout')
	async logOutDealer() {
		return 'logout dealer';
	}
}
