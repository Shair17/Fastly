import { Controller, GET as Get } from 'fastify-decorators';
import { UserService } from './user.service';
import { Request, Reply } from '../../interfaces/http.interfaces';
import {
	hasBearerToken,
	userIsAuthenticated,
} from '../../shared/hooks/auth.hook';

@Controller('/users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('/me', {
		onRequest: [hasBearerToken, userIsAuthenticated],
	})
	async me({ userId }: Request, reply: Reply) {
		return this.userService.me(userId);
	}
}
