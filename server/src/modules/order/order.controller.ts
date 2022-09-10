import type {FastifyRequest as Request, FastifyReply as Reply} from 'fastify';
import {Controller, GET, POST} from 'fastify-decorators';
import {OrderService} from './order.service';
import {
  hasBearerToken,
  dealerIsAuthenticated,
  userIsAuthenticated,
} from '../../shared/hooks/auth';
import {CreateOrderBody, CreateOrderBodyType} from './order.schema';

@Controller('/v1/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @GET('/', {
    onRequest: [hasBearerToken, dealerIsAuthenticated],
  })
  async getOrders(request: Request, reply: Reply) {
    return this.orderService.getOrdersForQueue();
  }

  @POST('/', {
    schema: {
      body: CreateOrderBody,
    },
    onRequest: [hasBearerToken, userIsAuthenticated],
  })
  async createOrder(
    request: Request<{
      Body: CreateOrderBodyType;
    }>,
    reply: Reply,
  ) {
    return this.orderService.createOrder(request.body);
  }
}
