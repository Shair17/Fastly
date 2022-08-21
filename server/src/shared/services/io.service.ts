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
import {OrderQueue} from '@fastly/modules/order/order-queue';

@Service()
export class IOService implements OnModuleInit {
  private readonly app: FastifyInstance =
    getInstanceByToken<FastifyInstance>(FastifyInstanceToken);

  constructor(
    private readonly userService: UserService,
    private readonly dealerService: DealerService,
    private readonly orderService: OrderService,
    private readonly orderQueue: OrderQueue,
  ) {}

  public get io() {
    return this.app.io;
  }

  @Initializer()
  async onModuleInit(): Promise<void> {
    const {io} = this;

    io.on('connection', async socket => {
      /** Ordenes */
      socket.on('SEND_ORDER_ID', async (orderId: string) => {
        const order = await this.orderService.getById(orderId);

        if (!order) {
          return socket.disconnect();
        }

        const orderItem = this.orderQueue.getByOrderId(order.id);

        socket.emit('GET_ORDER', {order, orderItem});
      });

      /** Repartidores */
      socket.on('SEND_DEALER_ID', async (dealerId: string) => {
        const dealer = await this.dealerService.getById(dealerId);

        if (!dealer) {
          return socket.disconnect();
        }

        socket.on('SET_DEALER_AVAILABLE', async (isAvailable: boolean) => {
          await this.dealerService.setDealerAvailable(dealerId, isAvailable);
        });

        io.emit('ORDERS_QUEUE', this.orderQueue.getQueue());
        io.emit('ORDERS_PENDING_QUEUE', this.orderQueue.pendingQueue);
        io.emit('ORDERS_DELIVERED_QUEUE', this.orderQueue.deliveredQueue);
        io.emit('ORDERS_CANCELLED_QUEUE', this.orderQueue.cancelledQueue);
        io.emit('ORDERS_PROBLEM_QUEUE', this.orderQueue.problemQueue);
        io.emit('ORDERS_SENT_QUEUE', this.orderQueue.sentQueue);
      });

      /** Usuarios */
      socket.on('SEND_USER_ID', async (userId: string) => {
        const user = await this.userService.getById(userId);

        if (!user) {
          return socket.disconnect();
        }

        const userHasOngoingOrders =
          await this.orderService.userHasOngoingOrders(user.id);

        // io.emit o socket.emit ??
        // aún no lo sé, io es para emitir a todos los clientes pero eso no necesito
        // socket.emit es para emitir al cliente que hizo la petición
        // creo que es socket.emit ... pero bueno, hay que verificar eso
        socket.emit('USER_HAS_ONGOING_ORDERS', userHasOngoingOrders);
      });
    });
  }
}
