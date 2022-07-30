import {Service} from 'fastify-decorators';
import {Unauthorized, NotFound} from 'http-errors';
import {Order, OrderStatus} from '@prisma/client';
import {DatabaseService} from '@fastly/database/DatabaseService';
import {UserService} from '../user/user.service';
import {DealerService} from '../dealer/dealer.service';
import {ProductService} from '../product/product.service';

@Service('OrderServiceToken')
export class OrderService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly dealerService: DealerService,
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  getById(id: string) {
    return this.databaseService.order.findUnique({where: {id}});
  }

  async getByIdOrThrow(id: string) {
    const order = await this.getById(id);

    if (!order) {
      throw new NotFound();
    }

    return order;
  }

  async getOrdersByStatus(status: OrderStatus) {
    return this.databaseService.order.findMany({where: {status}});
  }

  async createOrder(order: Order) {
    const {
      arrivalTime,
      dealerId,
      deliveryPrice,
      message,
      productId,
      quantity,
      status,
      userId,
    } = order;

    const user = await this.userService.getByIdOrThrow(userId);
    const product = await this.productService.getByIdOrThrow(productId);

    return this.databaseService.order.create({
      data: {
        arrivalTime,
        quantity,
        status,
        deliveryPrice,
        message,
        dealer: {
          connect: {
            id: dealerId || undefined,
          },
        },
        product: {
          connect: {
            id: product.id,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  async setDealerToOrder(dealerId: string, orderId: string) {
    const dealer = await this.dealerService.getByIdOrThrow(dealerId);
    const order = await this.getByIdOrThrow(orderId);

    return this.databaseService.order.update({
      where: {
        id: order.id,
      },
      data: {
        dealer: {
          connect: {
            id: dealer.id,
          },
        },
      },
    });
  }

  async setArrivalTimeToOrder(arrivalTime: Date, orderId: string) {
    const order = await this.getByIdOrThrow(orderId);

    return this.databaseService.order.update({
      where: {id: order.id},
      data: {arrivalTime},
    });
  }

  async setDeliveryPriceToOrder(deliveryPrice: number, orderId: string) {
    const order = await this.getByIdOrThrow(orderId);

    return this.databaseService.order.update({
      where: {
        id: order.id,
      },
      data: {
        deliveryPrice,
      },
    });
  }

  async setMessageToOrder(message: string, orderId: string) {
    const order = await this.getByIdOrThrow(orderId);

    return this.databaseService.order.update({
      where: {
        id: order.id,
      },
      data: {
        message,
      },
    });
  }

  async updateOrderStatus(id: string, status: OrderStatus) {
    return this.databaseService.order.update({
      where: {id},
      data: {
        status,
      },
    });
  }

  async deleteOrder(orderId: string) {
    return this.databaseService.order.delete({where: {id: orderId}});
  }

  async getOrdersFromUser(userId: string) {
    const user = await this.userService.getByIdOrThrow(userId);

    return user.orders;
  }

  async getOrdersFromDealer(dealerId: string) {
    const dealer = await this.dealerService.getByIdOrThrow(dealerId);

    return this.databaseService.order.findMany({
      where: {
        dealer: {
          id: dealer.id,
        },
      },
    });
  }

  /**
   * NUNCA lanzar un error http en este tipo de métodos
   * ya que, estos métodos se usarán en los sockets
   * devolver solo tipos de datos...
   * en este caso, devuelvo true o false, dadas las circunstancias
   */
  async userHasOngoingOrders(userId: string) {
    const user = await this.userService.getById(userId);

    if (!user) {
      return false;
    }

    const OngoingOrdersCount = await this.databaseService.order.count({
      where: {
        user: {
          id: user.id,
        },
        status: {
          notIn: ['CANCELLED', 'DELIVERED'],
        },
      },
    });

    return OngoingOrdersCount > 0;
  }
}
