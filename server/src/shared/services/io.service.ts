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
  async onModuleInit(): Promise<void> {
    const {io} = this;

    io.on('connection', async socket => {
      /** Ordenes */

      /** Repartidores */

      /** Usuarios */
      socket.on('sendUserIdToGetIfHasOngoingOrders', async (userId: string) => {
        const userHasOngoingOrders =
          await this.orderService.userHasOngoingOrders(userId);

        // io.emit o socket.emit ??
        // aún no lo sé, io es para emitir a todos los clientes pero eso no necesito
        // socket.emit es para emitir al cliente que hizo la petición
        // creo que es socket.emit ... pero bueno, hay que verificar eso
        socket.emit('userHasOngoingOrders', userHasOngoingOrders);
      });
    });
  }
}
