import {FastifyInstance} from 'fastify';
import {
  FastifyInstanceToken,
  Initializer,
  getInstanceByToken,
  Service,
} from 'fastify-decorators';
import {OrderService} from '@fastly/modules/order/order.service';
import type {OnModuleInit} from '@fastly/interfaces/module';

@Service()
export class IOService implements OnModuleInit {
  private readonly app: FastifyInstance =
    getInstanceByToken<FastifyInstance>(FastifyInstanceToken);

  constructor(private readonly orderService: OrderService) {}

  private get io() {
    return this.app.io;
  }

  @Initializer([OrderService])
  async onModuleInit() {
    const {io} = this;

    io.on('connection', async socket => {
      socket.on('userHasOngoingOrders', cb => {
        // const userHasOngoingOrders = await this.orderService.userHasOngoingOrders(userId);

        cb(true);
      });
      // socket.on('siguiente-ticket-trabajar', data => {
      //   server.io.emit('ticket-asignado', 'dasdasd');
      // });
    });
  }
}
