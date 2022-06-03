import { Controller, GET as Get, PUT as Put } from 'fastify-decorators';
import { UserService } from './user.service';
import { Request, Reply } from '../../interfaces/http.interfaces';
import {
	hasBearerToken,
	userIsAuthenticated,
} from '../../shared/hooks/auth.hook';
import { UpdateNewUserBody, UpdateNewUserBodyType } from './user.schema';

@Controller('/users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('/count')
	count() {
		return this.userService.count();
	}

	@Get('/me', {
		onRequest: [hasBearerToken, userIsAuthenticated],
	})
	me(request: Request, reply: Reply) {
		return this.userService.me(request.userId);
	}

	@Get('/me/addresses', {
		onRequest: [hasBearerToken, userIsAuthenticated],
	})
	myAddresses(request: Request, reply: Reply) {
		return this.userService.myAddresses(request.userId);
	}

	@Put('/new-user', {
		schema: {
			body: UpdateNewUserBody,
		},
		onRequest: [hasBearerToken, userIsAuthenticated],
	})
	updateNewUser(
		request: Request<{
			Body: UpdateNewUserBodyType;
		}>,
		reply: Reply
	) {
		return this.userService.updateNewUser(request.body, request.userId);
	}
}
