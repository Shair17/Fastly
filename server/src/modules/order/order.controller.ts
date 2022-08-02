import {Controller, GET, POST} from 'fastify-decorators';
import {Request, Reply} from '@fastly/interfaces/http';
import {OrderService} from './order.service';
import {hasBearerToken, userIsAuthenticated} from '@fastly/shared/hooks/auth';
import {CreateOrderBody, CreateOrderBodyType} from './order.schema';

@Controller('/v1/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

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
