import {FastifyInstance} from 'fastify';
import {
  FastifyInstanceToken,
  Initializer,
  getInstanceByToken,
  Service,
} from 'fastify-decorators';
import type {OnModuleInit} from '@fastly/interfaces/module';
import {UserService} from '@fastly/modules/user/user.service';
import {DealerService} from '@fastly/modules/dealer/dealer.service';
import {OrderService} from '@fastly/modules/order/order.service';

@Service()
export class IOService implements OnModuleInit {
  private readonly app: FastifyInstance =
    getInstanceByToken<FastifyInstance>(FastifyInstanceToken);

  constructor(
    private readonly userService: UserService,
    private readonly dealerService: DealerService,
    private readonly orderService: OrderService,
  ) {}

  public get io() {
    return this.app.io;
  }

  @Initializer([UserService, DealerService, OrderService])
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
