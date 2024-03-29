import {Service} from 'fastify-decorators';
import {Unauthorized, NotFound} from 'http-errors';
import {Dealer, Order, OrderStatus} from '@prisma/client';
import {DatabaseService} from '../../database/DatabaseService';
import {UserService} from '../user/user.service';
import {DealerService} from '../dealer/dealer.service';
import {ProductService} from '../product/product.service';
import {CreateOrderBodyType} from './order.schema';
import {IOrder} from '@fastly/shared/classes/order.class';

@Service('OrderServiceToken')
export class OrderService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly dealerService: DealerService,
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  count() {
    return this.databaseService.order.count();
  }

  async getById(id: string): Promise<IOrder | null> {
    const order = await this.databaseService.order.findUnique({
      where: {id},
      include: {
        address: true,
        user: true,
        products: {
          include: {
            store: {
              select: {
                name: true,
              },
              include: {
                owner: {
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!order) return null;

    return {
      arrivalTime: order.arrivalTime,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      deliveryPrice: order.deliveryPrice,
      id: order.id,
      message: order.message,
      quantity: order.quantity,
      status: order.status,
      products: order.products,
      dealerId: order.dealerId,
      userId: order.userId,
      userAddressId: order.userAddressId,
      address: order.address,
      userName: order.user.name,
      userPhone: order.user.phone! || '',
    };
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

  async getOrdersForQueue(): Promise<IOrder[]> {
    const orders = await this.databaseService.order.findMany({
      where: {
        status: {
          notIn: ['CANCELLED', 'DELIVERED'],
        },
      },
      include: {
        address: true,
        user: true,
        products: {
          select: {
            blurHash: true,
            id: true,
            image: true,
            description: true,
            name: true,
            price: true,
            rankings: true,
            coupon: true,
            couponId: true,
            storeId: true,
            createdAt: true,
            updatedAt: true,
            store: {
              select: {
                name: true,
                owner: {
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const response = orders.map(order => {
      return {
        arrivalTime: order.arrivalTime,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        deliveryPrice: order.deliveryPrice,
        id: order.id,
        message: order.message,
        quantity: order.quantity,
        status: order.status,
        products: order.products,
        dealerId: order.dealerId,
        userId: order.userId,
        userAddressId: order.userAddressId,
        address: order.address,
        userName: order.user.name,
        userPhone: order.user.phone! || '',
      };
    });

    return response;
  }

  async createOrder({
    addressId,
    productIDs,
    quantity,
    userId,
    dealerId,
    message,
  }: CreateOrderBodyType) {
    const [user, address, products] = await Promise.all([
      this.userService.getByIdOnlyUserOrThrow(userId),
      this.userService.getUserAddressByIdOrThrow(addressId),
      this.productService.verifyProductIDsInDatabaseOrThrow(productIDs),
    ]);

    let dealer: Dealer | null = null;

    if (dealerId !== undefined) {
      dealer = await this.dealerService.getByIdOrThrow(dealerId);
    }

    const productsToConnect = products.map(productId => ({
      id: productId,
    }));

    const order = await this.databaseService.order.create({
      data: {
        quantity,
        message,
        dealer: {
          connect: {
            id: dealer?.id ?? undefined,
          },
        },
        products: {
          connect: productsToConnect,
        },
        user: {
          connect: {
            id: user.id,
          },
        },
        address: {
          connect: {
            id: address.id,
          },
        },
      },
    });

    // add order to queue
    // Usar sockets para esto :c
    // por alguna razón, esto no funca por los decoradores
    // this.orderQueueService.enqueue(order);
    // En la aplicación debería existir un evento que emita el order id cuando haya uno

    return order;
  }

  async setDealerToOrder(dealerId: string, orderId: string) {
    const [dealer, order] = await Promise.all([
      this.dealerService.getByIdOrThrow(dealerId),
      this.getByIdOrThrow(orderId),
    ]);

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
  async userHasOngoingOrders(userId: string): Promise<boolean> {
    const user = await this.userService.getByIdOnlyUser(userId);

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

  async dealerHasOngoingOrdersInDatabase(dealerId: string): Promise<boolean> {
    const dealer = await this.dealerService.getByIdOnlyDealer(dealerId);

    if (!dealer) {
      return false;
    }

    const OngoingOrdersCount = await this.databaseService.order.count({
      where: {
        dealer: {
          id: dealer.id,
        },
        status: {
          notIn: ['CANCELLED', 'DELIVERED'],
        },
      },
    });

    return OngoingOrdersCount > 0;
  }
}
