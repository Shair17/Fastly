import { Controller, GET, POST, PUT, DELETE } from 'fastify-decorators';
import { UserService } from './user.service';
import { Request, Reply } from '@fastly/interfaces/http';
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
import { hasBearerToken, userIsAuthenticated } from '@fastly/shared/hooks/auth';
import {
  UpdateNewUserBody,
  UpdateNewUserBodyType,
  MyAddressParams,
  MyAddressParamsType,
} from './user.schema';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GET('/count')
  count() {
    return this.userService.count();
  }

  @GET('/me', {
    onRequest: [hasBearerToken, userIsAuthenticated],
  })
  me(request: Request, reply: Reply) {
    return this.userService.me(request.userId);
  }

  @GET('/me/addresses', {
    onRequest: [hasBearerToken, userIsAuthenticated],
  })
  myAddresses(request: Request, reply: Reply) {
    return this.userService.myAddresses(request.userId);
  }

  @GET('/me/addresses/:id', {
    schema: {
      params: MyAddressParams,
    },
    onRequest: [hasBearerToken, userIsAuthenticated],
  })
  myAddress(
    request: Request<{
      Params: MyAddressParamsType;
    }>,
    reply: Reply,
  ) {
    return this.userService.myAddress(request.userId, request.params.id);
  }

  @POST('/me/addresses', {
    schema: {
      body: AddAddressBody,
    },
    onRequest: [hasBearerToken, userIsAuthenticated],
  })
  addAddress(
    request: Request<{
      Body: AddAddressBodyType;
    }>,
    reply: Reply,
  ) {
    return this.userService.addAddress(request.userId, request.body);
  }

  @DELETE('/me/addresses/:id', {
    schema: {
      params: DeleteAddressParams,
    },
    onRequest: [hasBearerToken, userIsAuthenticated],
  })
  deleteAddress(
    request: Request<{
      Params: DeleteAddressParamsType;
    }>,
    reply: Reply,
  ) {
    return this.userService.deleteAddress(request.userId, request.params.id);
  }

  @GET('/me/cart', {
    onRequest: [hasBearerToken, userIsAuthenticated],
  })
  myCart(request: Request, reply: Reply) {
    return this.userService.myCart(request.userId);
  }

  @GET('/me/cart/:id', {
    schema: {
      params: MyItemCartParams,
    },
    onRequest: [hasBearerToken, userIsAuthenticated],
  })
  myItemCart(
    request: Request<{
      Params: MyItemCartParamsType;
    }>,
    reply: Reply,
  ) {
    return this.userService.myItemCart(request.userId, request.params.id);
  }

  @POST('/me/cart', {
    schema: {
      body: AddItemCartBody,
    },
    onRequest: [hasBearerToken, userIsAuthenticated],
  })
  addItemCart(
    request: Request<{
      Body: AddItemCartBodyType;
    }>,
    reply: Reply,
  ) {
    return this.userService.addItemCart(request.userId, request.body);
  }

  @PUT('/me/cart/:id', {
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
    reply: Reply,
  ) {
    return this.userService.editItemCartQuantity(
      request.userId,
      request.params.id,
      request.body,
    );
  }

  @DELETE('/me/cart', {
    onRequest: [hasBearerToken, userIsAuthenticated],
  })
  deleteCart(request: Request, reply: Reply) {
    return this.userService.deleteCart(request.userId);
  }

  @DELETE('/me/cart/:id', {
    schema: {
      params: MyFavoriteParams,
    },
    onRequest: [hasBearerToken, userIsAuthenticated],
  })
  deleteItemCart(
    request: Request<{
      Params: MyFavoriteParamsType;
    }>,
    reply: Reply,
  ) {
    return this.userService.deleteItemCart(request.userId, request.params.id);
  }

  @GET('/me/favorites', {
    onRequest: [hasBearerToken, userIsAuthenticated],
  })
  myFavorites(request: Request, reply: Reply) {
    return this.userService.myFavorites(request.userId);
  }

  @GET('/me/favorites/:id', {
    schema: {
      params: MyFavoriteParams,
    },
    onRequest: [hasBearerToken, userIsAuthenticated],
  })
  myFavorite(
    request: Request<{
      Params: MyFavoriteParamsType;
    }>,
    reply: Reply,
  ) {
    return this.userService.myFavorite(request.userId, request.params.id);
  }

  @DELETE('/me/favorites/:id', {
    schema: {
      params: DeleteFavoriteParams,
    },
    onRequest: [hasBearerToken, userIsAuthenticated],
  })
  async deleteFavorite(
    request: Request<{
      Params: DeleteFavoriteParamsType;
    }>,
    reply: Reply,
  ) {
    return this.userService.deleteFavorite(request.userId, request.params.id);
  }

  @DELETE('/me/favorites', {
    onRequest: [hasBearerToken, userIsAuthenticated],
  })
  async deleteFavorites(request: Request, reply: Reply) {
    return this.userService.deleteFavorites(request.userId);
  }

  // TODO: agregar paginación
  @GET('/me/orders', {
    onRequest: [hasBearerToken, userIsAuthenticated],
  })
  async myOrders(request: Request, reply: Reply) {
    return this.userService.myOrders(request.userId);
  }

  @PUT('/new-user', {
    schema: {
      body: UpdateNewUserBody,
    },
    onRequest: [hasBearerToken, userIsAuthenticated],
  })
  updateNewUser(
    request: Request<{
      Body: UpdateNewUserBodyType;
    }>,
    reply: Reply,
  ) {
    return this.userService.updateNewUser(request.body, request.userId);
  }

  @PUT('/me', {
    schema: {
      body: UpdateUserProfileBody,
    },
    onRequest: [hasBearerToken, userIsAuthenticated],
  })
  updateUserProfile(
    request: Request<{
      Body: UpdateUserProfileBodyType;
    }>,
    reply: Reply,
  ) {
    return this.userService.updateUserProfile(request.userId, request.body);
  }
}
