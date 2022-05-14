import { Controller, GET as Get, POST as Post } from 'fastify-decorators';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('/facebook')
	async logInWithFacebook() {
		return 'facebook';
	}
}
