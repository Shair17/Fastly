import type {FastifyRequest as Request, FastifyReply as Reply} from 'fastify';
import {Controller, GET, POST} from 'fastify-decorators';
import {DealerService} from './dealer.service';
import {GetIsActiveDealerParamsType} from './dealer.schema';
import {
  CreateDealerRankingBody,
  CreateDealerRankingBodyType,
  GetMyOrdersQueryString,
  GetMyOrdersQueryStringType,
  GetMyRankingsQueryString,
  GetMyRankingsQueryStringType,
  CreateDealerRankingParams,
  CreateDealerRankingParamsType,
  GetDealerParams,
  GetDealerParamsType,
  GetDealerRankingParams,
  GetDealerRankingParamsType,
  GetDealerRankingsParams,
  GetDealerRankingsParamsType,
  GetIsActiveDealerParams,
} from './dealer.schema';
import {
  hasBearerToken,
  dealerIsAuthenticated,
  adminIsAuthenticated,
  adminOrCustomerOrDealerOrUserIsAuthenticated,
  userIsAuthenticated,
} from '../../shared/hooks/auth';

@Controller('/v1/dealers')
export class DealerController {
  constructor(private readonly dealerService: DealerService) {}

  @GET('/count')
  async count() {
    return this.dealerService.count();
  }

  @GET('/:id', {
    schema: {
      params: GetDealerParams,
    },
  })
  async getDealer(
    request: Request<{
      Params: GetDealerParamsType;
    }>,
    reply: Reply,
  ) {
    return this.dealerService.me(request.params.id);
  }

  @POST('/:id/ranking', {
    schema: {
      params: CreateDealerRankingParams,
      body: CreateDealerRankingBody,
    },
    onRequest: [hasBearerToken, userIsAuthenticated],
  })
  createDealerRanking(
    request: Request<{
      Params: CreateDealerRankingParamsType;
      Body: CreateDealerRankingBodyType;
    }>,
    reply: Reply,
  ) {
    return this.dealerService.createDealerRanking(
      request.params.id,
      request.body,
    );
  }

  @GET('/:id/ranking', {
    schema: {
      params: GetDealerRankingParams,
    },
    onRequest: [hasBearerToken, adminOrCustomerOrDealerOrUserIsAuthenticated],
  })
  getDealerRanking(
    request: Request<{
      Params: GetDealerRankingParamsType;
    }>,
    reply: Reply,
  ) {
    return this.dealerService.getDealerRanking(request.params.id);
  }

  @GET('/:id/rankings', {
    schema: {
      params: GetDealerRankingsParams,
    },
    onRequest: [hasBearerToken, adminOrCustomerOrDealerOrUserIsAuthenticated],
  })
  getDealerRankings(
    request: Request<{
      Params: GetDealerRankingsParamsType;
    }>,
    reply: Reply,
  ) {
    return this.dealerService.getDealerRankings(request.params.id);
  }

  @GET('/', {
    onRequest: [hasBearerToken, adminIsAuthenticated],
  })
  async getDealers(request: Request, reply: Reply) {
    return this.dealerService.getDealers();
  }

  @GET('/me', {
    onRequest: [hasBearerToken, dealerIsAuthenticated],
  })
  async me({dealerId}: Request, reply: Reply) {
    return this.dealerService.me(dealerId);
  }

  @GET('/me/orders-count', {
    onRequest: [hasBearerToken, dealerIsAuthenticated],
  })
  async getMyOrdersCount(request: Request, reply: Reply) {
    return this.dealerService.getMyOrdersCount(request.dealerId);
  }

  @GET('/me/orders', {
    schema: {
      querystring: GetMyOrdersQueryString,
    },
    onRequest: [hasBearerToken, dealerIsAuthenticated],
  })
  async getMyOrders(
    request: Request<{
      Querystring: GetMyOrdersQueryStringType;
    }>,
    reply: Reply,
  ) {
    return this.dealerService.getMyOrders(request.dealerId, request.query);
  }

  @GET('/me/ranking', {
    onRequest: [hasBearerToken, dealerIsAuthenticated],
  })
  async getMyRanking(request: Request, reply: Reply) {
    return this.dealerService.getMyRanking(request.dealerId);
  }

  @GET('/me/rankings', {
    schema: {
      querystring: GetMyRankingsQueryString,
    },
    onRequest: [hasBearerToken, dealerIsAuthenticated],
  })
  async getMyRankings(
    request: Request<{
      Querystring: GetMyRankingsQueryStringType;
    }>,
    reply: Reply,
  ) {
    return this.dealerService.getMyRankings(request.dealerId, request.query);
  }

  @GET('/is-active/:id', {
    // Quité estos hooks porque si no está activo el dealer
    // directamente desde el hook te lanza un Unauthorized, entonces...
    // solo recibiré el dealerId por parametros
    // onRequest: [hasBearerToken, dealerIsAuthenticated],
    schema: {
      params: GetIsActiveDealerParams,
    },
  })
  async getIsActive(
    request: Request<{
      Params: GetIsActiveDealerParamsType;
    }>,
    reply: Reply,
  ) {
    return this.dealerService.getIsActive(request.params);
  }
}
