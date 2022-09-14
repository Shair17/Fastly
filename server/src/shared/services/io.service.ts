import {FastifyInstance} from 'fastify';
import {
  FastifyInstanceToken,
  Initializer,
  getInstanceByToken,
  Service,
} from 'fastify-decorators';
import type {OnModuleInit} from '../../interfaces/module';
import {UserService} from '../../modules/user/user.service';
import {DealerService} from '../../modules/dealer/dealer.service';
import {OrderService} from '../../modules/order/order.service';
import {OrderQueue} from '../../modules/order/order-queue';
import {isValidToken} from '../../utils/isValidToken';
import {JwtService} from './jwt.service';
import type {JwtPayload} from 'jsonwebtoken';

@Service()
export class IOService implements OnModuleInit {
  private readonly fastify: FastifyInstance =
    getInstanceByToken<FastifyInstance>(FastifyInstanceToken);

  constructor(
    private readonly userService: UserService,
    private readonly dealerService: DealerService,
    private readonly jwtService: JwtService,
    private readonly orderService: OrderService,
    private readonly orderQueue: OrderQueue,
  ) {}

  public get io() {
    return this.fastify.io;
  }

  @Initializer()
  async onModuleInit(): Promise<void> {
    this.socketEvents();
  }

  socketEvents(): void {
    this.io.on('connection', async socket => {
      const token = socket.handshake.auth.token as string;
      const isValidToken = this.isValidToken(token);
      const userId = this.getUserIdFromToken(token);
      const dealerId = this.getDealerIdFromToken(token);
      const isUser = userId !== null && typeof userId === 'string';
      const isDealer = dealerId !== null && typeof dealerId === 'string';

      // Si el token es invalido O si no es usuario ni dealer entonces desconectar del socket
      if (!isValidToken || (!isUser && !isDealer)) {
        return socket.disconnect();
      }

      // Eventos de socket para usuarios
      if (isUser) {
        const user = await this.userService.getById(userId);

        if (!user || user.isBanned) {
          return socket.disconnect();
        }

        // console.log(
        //   `[Socket-Event] - El usuario con id ${userId} se ha conectado.`,
        // );

        // Esto será útil para mandar informacion de su pedido solamente a el usuario conectado, mensaje uno a uno
        socket.join(userId);

        socket.emit(
          'USER_HAS_ONGOING_ORDERS',
          await this.orderService.userHasOngoingOrders(userId),
        );
      }

      // Eventos de socket para repartidores
      if (isDealer) {
        // Establecer como conectado al repartidor al momento que se conecte al socket server
        await this.dealerService.setDealerAvailable(dealerId, true);
        const dealer = await this.dealerService.getById(dealerId);

        if (!dealer || !dealer.isActive || dealer.isBanned) {
          return socket.disconnect();
        }

        // Unir el dealer a una sala
        socket.join(dealerId);

        socket.on('SET_DEALER_AVAILABLE', async (isAvailable: boolean) => {
          await this.dealerService.setDealerAvailable(dealerId, isAvailable);
        });
      }

      // Eventos de socket para ordenes
      this.io.emit('ORDERS_QUEUE', this.orderQueue.getQueue());
      this.io.emit('ORDERS_PENDING_QUEUE', this.orderQueue.getPendingQueue());
      this.io.emit(
        'ORDERS_DELIVERED_QUEUE',
        this.orderQueue.getDeliveredQueue(),
      );
      this.io.emit(
        'ORDERS_CANCELLED_QUEUE',
        this.orderQueue.getCancelledQueue(),
      );
      this.io.emit('ORDERS_PROBLEM_QUEUE', this.orderQueue.getProblemQueue());
      this.io.emit('ORDERS_SENT_QUEUE', this.orderQueue.getSentQueue());

      socket.on('disconnect', async socket => {
        if (isUser) {
        }

        if (isDealer) {
          await this.dealerService.setDealerAvailable(dealerId, false);
        }
      });
    });
  }

  getUserIdFromToken(token: string): string | null {
    if (!token) return null;

    try {
      const userDecoded = this.jwtService.verify(
        token,
        this.fastify.config.JWT_USER_SECRET,
      ) as {
        id: string;
      };

      if (userDecoded && userDecoded.id) return userDecoded.id;

      return null;
    } catch (error) {
      return null;
    }
  }

  getDealerIdFromToken(token: string): string | null {
    if (!token) return null;

    try {
      const dealerDecoded = this.jwtService.verify(
        token,
        this.fastify.config.JWT_DEALER_SECRET,
      ) as {
        id: string;
      };

      if (dealerDecoded && dealerDecoded.id) return dealerDecoded.id;

      return null;
    } catch (error) {
      return null;
    }
  }

  isValidToken(token: string) {
    if (!token) return false;

    if (!isValidToken(token)) return false;

    const decoded = this.jwtService.decode(token) as JwtPayload;

    if (!decoded) return false;

    if (new Date(decoded.exp! * 1000) < new Date()) return false;

    return true;
  }
}
