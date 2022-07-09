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
	AddItemCartBody,
	AddItemCartBodyType,
	DeleteAddressParams,
	DeleteAddressParamsType,
	DeleteFavoriteParams,
	DeleteFavoriteParamsType,
	EditItemCartQuantityBody,
	EditItemCartQuantityBodyType,
	EditItemCartQuantityParams,
	EditItemCartQuantityParamsType,
	MyFavoriteParams,
	MyFavoriteParamsType,
	MyItemCartParams,
	MyItemCartParamsType,
	UpdateUserProfileBody,
	UpdateUserProfileBodyType,
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

	@Get('/me/cart', {
		onRequest: [hasBearerToken, userIsAuthenticated],
	})
	myCart(request: Request, reply: Reply) {
		return this.userService.myCart(request.userId);
	}

	@Get('/me/cart/:id', {
		schema: {
			params: MyItemCartParams,
		},
		onRequest: [hasBearerToken, userIsAuthenticated],
	})
	myItemCart(
		request: Request<{
			Params: MyItemCartParamsType;
		}>,
		reply: Reply
	) {
		return this.userService.myItemCart(request.userId, request.params.id);
	}

	@Post('/me/cart', {
		schema: {
			body: AddItemCartBody,
		},
		onRequest: [hasBearerToken, userIsAuthenticated],
	})
	addItemCart(
		request: Request<{
			Body: AddItemCartBodyType;
		}>,
		reply: Reply
	) {
		return this.userService.addItemCart(request.userId, request.body);
	}

	@Put('/me/cart/:id', {
		schema: {
			params: EditItemCartQuantityParams,
			body: EditItemCartQuantityBody,
		},
		onRequest: [hasBearerToken, userIsAuthenticated],
	})
	editItemCartQuantity(
		request: Request<{
			Params: EditItemCartQuantityParamsType;
			Body: EditItemCartQuantityBodyType;
		}>,
		reply: Reply
	) {
		return this.userService.editItemCartQuantity(
			request.userId,
			request.params.id,
			request.body
		);
	}

	@Delete('/me/cart', {
		onRequest: [hasBearerToken, userIsAuthenticated],
	})
	deleteCart(request: Request, reply: Reply) {
		return this.userService.deleteCart(request.userId);
	}

	@Delete('/me/cart/:id', {
		schema: {
			params: MyFavoriteParams,
		},
		onRequest: [hasBearerToken, userIsAuthenticated],
	})
	deleteItemCart(
		request: Request<{
			Params: MyFavoriteParamsType;
		}>,
		reply: Reply
	) {
		return this.userService.deleteItemCart(request.userId, request.params.id);
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

	@Delete('/me/favorites/:id', {
		schema: {
			params: DeleteFavoriteParams,
		},
		onRequest: [hasBearerToken, userIsAuthenticated],
	})
	async deleteFavorite(
		request: Request<{
			Params: DeleteFavoriteParamsType;
		}>,
		reply: Reply
	) {
		return this.userService.deleteFavorite(request.userId, request.params.id);
	}

	@Delete('/me/favorites', {
		onRequest: [hasBearerToken, userIsAuthenticated],
	})
	async deleteFavorites(request: Request, reply: Reply) {
		return this.userService.deleteFavorites(request.userId);
	}

	// TODO: agregar paginación
	@Get('/me/orders', {
		onRequest: [hasBearerToken, userIsAuthenticated],
	})
	async myOrders(request: Request, reply: Reply) {
		return this.userService.myOrders(request.userId);
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

	@Put('/me', {
		schema: {
			body: UpdateUserProfileBody,
		},
		onRequest: [hasBearerToken, userIsAuthenticated],
	})
	updateUserProfile(
		request: Request<{
			Body: UpdateUserProfileBodyType;
		}>,
		reply: Reply
	) {
		return this.userService.updateUserProfile(request.userId, request.body);
	}
}
