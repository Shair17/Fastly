import {
	Controller,
	GET as Get,
	POST as Post,
	PUT as Put,
	DELETE as Delete,
} from 'fastify-decorators';
import { UserService } from './user.service';
import { Request, Reply } from '../../interfaces/http.interfaces';
import {
	AddAddressBody,
	AddAddressBodyType,
	DeleteAddressParams,
	DeleteAddressParamsType,
	MyFavoriteParams,
	MyFavoriteParamsType,
} from './user.schema';
import {
	hasBearerToken,
	userIsAuthenticated,
} from '../../shared/hooks/auth.hook';
import {
	UpdateNewUserBody,
	UpdateNewUserBodyType,
	MyAddressParams,
	MyAddressParamsType,
} from './user.schema';

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

	@Get('/me/addresses/:id', {
		schema: {
			params: MyAddressParams,
		},
		onRequest: [hasBearerToken, userIsAuthenticated],
	})
	myAddress(
		request: Request<{
			Params: MyAddressParamsType;
		}>,
		reply: Reply
	) {
		return this.userService.myAddress(request.userId, request.params.id);
	}

	@Post('/me/addresses', {
		schema: {
			body: AddAddressBody,
		},
		onRequest: [hasBearerToken, userIsAuthenticated],
	})
	addAddress(
		request: Request<{
			Body: AddAddressBodyType;
		}>,
		reply: Reply
	) {
		return this.userService.addAddress(request.userId, request.body);
	}

	@Delete('/me/addresses/:id', {
		schema: {
			params: DeleteAddressParams,
		},
		onRequest: [hasBearerToken, userIsAuthenticated],
	})
	deleteAddress(
		request: Request<{
			Params: DeleteAddressParamsType;
		}>,
		reply: Reply
	) {
		return this.userService.deleteAddress(request.userId, request.params.id);
	}

	@Get('/me/favorites', {
		onRequest: [hasBearerToken, userIsAuthenticated],
	})
	myFavorites(request: Request, reply: Reply) {
		return this.userService.myFavorites(request.userId);
	}

	@Get('/me/favorites/:id', {
		schema: {
			params: MyFavoriteParams,
		},
		onRequest: [hasBearerToken, userIsAuthenticated],
	})
	myFavorite(
		request: Request<{
			Params: MyFavoriteParamsType;
		}>,
		reply: Reply
	) {
		return this.userService.myFavorite(request.userId, request.params.id);
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
