import type {FastifyRequest as Request, FastifyReply as Reply} from 'fastify';
import {Controller, GET, POST, PUT, DELETE} from 'fastify-decorators';
import {
  hasBearerToken,
  userIsAuthenticated,
  customerIsAuthenticated,
} from '../../shared/hooks/auth';
import {StoreService} from './store.service';
import {
  adminOrCustomerIsAuthenticated,
  adminIsAuthenticated,
} from '../../shared/hooks/auth';
import {
  CreateStoreBody,
  GetStoreParams,
  CreateStoreBodyType,
  GetStoreParamsType,
  GetStoresQueryString,
  GetStoresQueryStringType,
  EditStoreParams,
  EditStoreBody,
  EditStoreParamsType,
  EditStoreBodyType,
  DeleteStoreParams,
  DeleteStoreParamsType,
  GetRankingsByStoreIdParams,
  GetRankingsByStoreIdParamsType,
  CreateRankingByStoreIdParams,
  CreateRankingByStoreIdParamsType,
  CreateRankingByStoreIdBody,
  CreateRankingByStoreIdBodyType,
} from './store.schema';

@Controller('/v1/stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @GET('/admin', {
    onRequest: [hasBearerToken, adminIsAuthenticated],
  })
  async getStoresForAdmin() {
    return this.storeService.getStores();
  }

  @GET('/', {
    schema: {
      querystring: GetStoresQueryString,
    },
    onRequest: [hasBearerToken, userIsAuthenticated],
  })
  async getStores(
    request: Request<{
      Querystring: GetStoresQueryStringType;
    }>,
    reply: Reply,
  ) {
    if (request.query.category) {
      return this.storeService.getStoresByCategory(request.query.category);
    }

    return this.storeService.getStores();
  }

  @GET('/:id', {
    schema: {
      params: GetStoreParams,
    },
    onRequest: [hasBearerToken, userIsAuthenticated],
  })
  async getById(
    request: Request<{
      Params: GetStoreParamsType;
    }>,
    reply: Reply,
  ) {
    return this.storeService.getStore(request.params.id);
  }

  @GET('/categories')
  async getCategories() {
    return this.storeService.getCategories();
  }

  @POST('/', {
    schema: {
      body: CreateStoreBody,
    },
    onRequest: [hasBearerToken, adminOrCustomerIsAuthenticated],
  })
  async createStore(
    request: Request<{
      Body: CreateStoreBodyType;
    }>,
    reply: Reply,
  ) {
    return this.storeService.createStore(request.body);
  }

  @GET('/:id/rankings', {
    schema: {
      params: GetRankingsByStoreIdParams,
    },
    onRequest: [hasBearerToken, userIsAuthenticated],
  })
  async getRankingsByStoreId(
    request: Request<{
      Params: GetRankingsByStoreIdParamsType;
    }>,
    reply: Reply,
  ) {
    return this.storeService.getRankingsByStoreId(request.params.id);
  }

  @POST('/:id/rankings', {
    schema: {
      params: CreateRankingByStoreIdParams,
      body: CreateRankingByStoreIdBody,
    },
    onRequest: [hasBearerToken, userIsAuthenticated],
  })
  async createRankingByStoreId(
    request: Request<{
      Params: CreateRankingByStoreIdParamsType;
      Body: CreateRankingByStoreIdBodyType;
    }>,
    reply: Reply,
  ) {
    return this.storeService.createRankingByStoreId(
      request.params.id,
      request.body,
    );
  }

  @PUT('/:id', {
    schema: {
      params: EditStoreParams,
      body: EditStoreBody,
    },
    onRequest: [hasBearerToken, adminOrCustomerIsAuthenticated],
  })
  async editStore(
    request: Request<{
      Params: EditStoreParamsType;
      Body: EditStoreBodyType;
    }>,
    reply: Reply,
  ) {
    return this.storeService.editStore(request.params.id, request.body);
  }

  @DELETE('/:id', {
    schema: {
      params: DeleteStoreParams,
    },
    onRequest: [hasBearerToken, adminOrCustomerIsAuthenticated],
  })
  async deleteStore(
    request: Request<{
      Params: DeleteStoreParamsType;
    }>,
    reply: Reply,
  ) {
    return this.storeService.deleteStore(request.params.id);
  }
}
