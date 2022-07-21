import {FastifyInstance} from 'fastify';
import {
  Controller,
  FastifyInstanceToken,
  GET,
  getInstanceByToken,
} from 'fastify-decorators';
import {Request, Reply} from '@fastly/interfaces/http';
import {OrderService} from './order.service';

@Controller('/v1/orders')
export class OrderController {
  private readonly fastify: FastifyInstance =
    getInstanceByToken<FastifyInstance>(FastifyInstanceToken);

  constructor(private readonly orderService: OrderService) {}

  @GET('/')
  async getOrders(request: Request, reply: Reply) {
    return '';
  }
}
