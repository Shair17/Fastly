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
  private readonly fastify =
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
      const adminId = this.getAdminIdFromToken(token);
      const userId = this.getUserIdFromToken(token);
      const dealerId = this.getDealerIdFromToken(token);
      const isAdmin = adminId !== null && typeof adminId === 'string';
      const isUser = userId !== null && typeof userId === 'string';
      const isDealer = dealerId !== null && typeof dealerId === 'string';

      // Si el token es invalido O si no es usuario ni dealer entonces desconectar del socket
      if (!isValidToken || (!isAdmin && !isUser && !isDealer)) {
        return socket.disconnect();
      }

      // es necesario que esté aquí?
      // this.io | socket ??
      this.io.emit(
        'ARE_THERE_AVAILABLE_DEALERS',
        await this.orderQueue.areThereAvailableDealers(),
      );

      if (isAdmin) {
        // Eventos para administrador
      }

      // Eventos de socket para usuarios
      if (isUser) {
        const user = await this.userService.getByIdOnlyUser(userId);

        if (!user || user.isBanned) {
          return socket.disconnect();
        }

        // Esto será útil para mandar informacion de su pedido solamente a el usuario conectado, mensaje uno a uno
        socket.join(userId);

        this.io.emit(
          'ARE_THERE_AVAILABLE_DEALERS',
          await this.orderQueue.areThereAvailableDealers(),
        );

        socket.emit(
          'USER_HAS_ONGOING_ORDERS',
          await this.orderService.userHasOngoingOrders(userId),
        );
      }

      // Eventos de socket para repartidores
      if (isDealer) {
        await this.dealerService.setDealerAvailable(dealerId, true);

        const dealer = await this.dealerService.getByIdOnlyDealer(dealerId);

        if (!dealer || !dealer.isActive || dealer.isBanned) {
          return socket.disconnect();
        }

        // Unir el dealer a una sala
        socket.join(dealerId);

        // Para emitir desde otro lugar q no sea isDealer
        // socket.to(dealerId).emit('DEALER_HAS_ACTIVE_ORDERS', await this.orderQueue.dealerHasOngoingOrdersInQueue(dealerId))

        // Esto emite al mismo socket
        socket.emit(
          'DEALER_HAS_ACTIVE_ORDERS',
          await this.orderQueue.dealerHasOngoingOrdersInQueue(dealerId),
        );

        socket.on('SET_DEALER_AVAILABLE', async (isAvailable: boolean) => {
          await this.dealerService.setDealerAvailable(dealerId, isAvailable);
        });

        this.io.emit(
          'ARE_THERE_AVAILABLE_DEALERS',
          await this.orderQueue.areThereAvailableDealers(),
        );
      }

      // Eventos de socket para ordenes
      socket.on('NEW_ORDER_CREATED', async (orderId: string) => {
        const order = await this.orderService.getById(orderId);

        if (!order) return;

        this.orderQueue.enqueue(order);

        if (order.dealerId) {
          socket
            .to(order.dealerId)
            .emit(
              'DEALER_HAS_ACTIVE_ORDERS',
              await this.orderQueue.dealerHasOngoingOrdersInQueue(
                order.dealerId,
              ),
            );
        }

        // Esto sirve para emitir la orden creada a todos los sockets conectados menos al que hizo este socket
        // socket.broadcast.emit('NEW_ORDER_CREATED', order.id);
      });

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
          this.io.emit(
            'ARE_THERE_AVAILABLE_DEALERS',
            await this.orderQueue.areThereAvailableDealers(),
          );
        }

        if (isDealer) {
          await this.dealerService.setDealerAvailable(dealerId, false);

          this.io
            .to(dealerId)
            .emit(
              'DEALER_HAS_ACTIVE_ORDERS',
              await this.orderQueue.dealerHasOngoingOrdersInQueue(dealerId),
            );

          this.io.emit(
            'ARE_THERE_AVAILABLE_DEALERS',
            await this.orderQueue.areThereAvailableDealers(),
          );
        }
      });
    });
  }

  getAdminIdFromToken(token: string): string | null {
    if (!token) return null;

    try {
      const adminDecoded = this.jwtService.verify(
        token,
        this.fastify.config.JWT_ADMIN_SECRET,
      ) as {
        id: string;
      };

      if (adminDecoded && adminDecoded) return adminDecoded.id;

      return null;
    } catch (error) {
      return null;
    }
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
