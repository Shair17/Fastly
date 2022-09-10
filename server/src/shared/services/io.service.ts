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
import {BEARER_SCHEME_REGEX} from '../../constants/regex';
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
    /**
    io.on('connection', async socket => {
      // Ordenes
      socket.on('SEND_ORDER_ID', async (orderId: string) => {
        const order = await this.orderService.getById(orderId);

        if (!order) {
          return socket.disconnect();
        }

        const orderItem = this.orderQueue.getByOrderId(order.id);

        socket.emit('GET_ORDER', {order, orderItem});
      });

      // Repartidores
      socket.on('SEND_DEALER_ID', async (dealerId: string) => {
        const dealer = await this.dealerService.getById(dealerId);

        if (!dealer) {
          return socket.disconnect();
        }

        socket.on('SET_DEALER_AVAILABLE', async (isAvailable: boolean) => {
          await this.dealerService.setDealerAvailable(dealerId, isAvailable);
        });

        // Como se debería de hacer acá? usar io.emit o socket.emit?
        io.emit('ORDERS_QUEUE', this.orderQueue.getQueue());
        io.emit('ORDERS_PENDING_QUEUE', this.orderQueue.pendingQueue);
        io.emit('ORDERS_DELIVERED_QUEUE', this.orderQueue.deliveredQueue);
        io.emit('ORDERS_CANCELLED_QUEUE', this.orderQueue.cancelledQueue);
        io.emit('ORDERS_PROBLEM_QUEUE', this.orderQueue.problemQueue);
        io.emit('ORDERS_SENT_QUEUE', this.orderQueue.sentQueue);
      });

      // TODO: probar esto
      socket.emit('ORDERS_QUEUE', this.orderQueue.getQueue());
      socket.emit('ORDERS_PENDING_QUEUE', this.orderQueue.pendingQueue);
      socket.emit('ORDERS_DELIVERED_QUEUE', this.orderQueue.deliveredQueue);
      socket.emit('ORDERS_CANCELLED_QUEUE', this.orderQueue.cancelledQueue);
      socket.emit('ORDERS_PROBLEM_QUEUE', this.orderQueue.problemQueue);
      socket.emit('ORDERS_SENT_QUEUE', this.orderQueue.sentQueue);

      // Usuarios
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
     */
  }

  socketEvents() {
    this.io.on('connection', async socket => {
      const authorization = socket.handshake.query['authorization'] as string;
      const {isValidJWT, token} = this.isValidJWT(authorization);

      if (!isValidJWT || !token) {
        return socket.disconnect();
      }

      const userId = this.getUserIdFromToken(token);
      const dealerId = this.getDealerIdFromToken(token);
    });
  }

  getUserIdFromToken(token: string): string | null {
    if (!token) return null;

    const userDecoded = this.jwtService.verify(
      token,
      this.fastify.config.JWT_USER_SECRET,
    ) as {
      id: string;
    };

    if (userDecoded && userDecoded.id) return userDecoded.id;

    return null;
  }

  getDealerIdFromToken(token: string): string | null {
    if (!token) return null;

    const dealerDecoded = this.jwtService.verify(
      token,
      this.fastify.config.JWT_DEALER_SECRET,
    ) as {
      id: string;
    };

    if (dealerDecoded && dealerDecoded.id) return dealerDecoded.id;

    return null;
  }

  isValidJWT(authorization: string): {
    isValidJWT: boolean;
    token: string | null;
  } {
    if (!authorization) return {isValidJWT: false, token: null};

    const parts = authorization.split(' ');

    if (!(parts.length !== 2)) return {isValidJWT: false, token: null};

    const scheme = parts[0];
    const token = parts[1];

    if (!BEARER_SCHEME_REGEX.test(scheme))
      return {isValidJWT: false, token: null};

    if (!isValidToken(token)) return {isValidJWT: false, token: null};

    const decoded = this.jwtService.decode(token) as JwtPayload;

    if (!decoded) return {isValidJWT: false, token: null};

    if (new Date(decoded.exp! * 1000) < new Date())
      return {isValidJWT: false, token: null};

    return {isValidJWT: true, token};
  }
}
