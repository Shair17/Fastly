import type {FastifyRequest as Request, FastifyReply as Reply} from 'fastify';
import {Controller, GET} from 'fastify-decorators';
import {FeedService} from './feed.service';
import {hasBearerToken, userIsAuthenticated} from '../../shared/hooks/auth';
import {
  GetFeedProductsQueryString,
  GetFeedProductsQueryStringType,
  GetStoresByCategoryQueryString,
  GetStoresByCategoryQueryStringType,
  GetFeedStoresQueryString,
  GetFeedStoresQueryStringType,
} from './feed.schema';

@Controller('/v1/feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @GET('/products', {
    onRequest: [hasBearerToken, userIsAuthenticated],
    schema: {
      querystring: GetFeedProductsQueryString,
    },
  })
  async getProductsForFeed(
    request: Request<{
      Querystring: GetFeedProductsQueryStringType;
    }>,
    reply: Reply,
  ) {
    return this.feedService.getProductsForFeed(request.query);
  }

  @GET('/stores', {
    onRequest: [hasBearerToken, userIsAuthenticated],
    schema: {
      querystring: GetFeedStoresQueryString,
    },
  })
  async getStoresForFeed(
    request: Request<{
      Querystring: GetFeedStoresQueryStringType;
    }>,
    reply: Reply,
  ) {
    return this.feedService.getStoresForFeed(request.query);
  }

  @GET('/stores-by-category', {
    onRequest: [hasBearerToken, userIsAuthenticated],
    schema: {
      querystring: GetStoresByCategoryQueryString,
    },
  })
  async getStoresByCategory(
    request: Request<{
      Querystring: GetStoresByCategoryQueryStringType;
    }>,
    reply: Reply,
  ) {
    return this.feedService.getStoresByCategory(request.query);
  }

  @GET('/', {
    onRequest: [hasBearerToken, userIsAuthenticated],
  })
  async getFeed() {
    return this.feedService.getFeed();
  }
}
