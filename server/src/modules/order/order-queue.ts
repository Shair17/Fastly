import {Initializer, Service} from 'fastify-decorators';
import {OrderService} from './order.service';
import {
  OrderClass,
  type ICoordinates,
} from '@fastly/shared/classes/order.class';
import {UserService} from '../user/user.service';
import {Dealer, Order, User} from '@prisma/client';
import {DealerService} from '../dealer/dealer.service';
import type {OnModuleInit} from '@fastly/interfaces/module';
import {LoggerService} from '@fastly/shared/services/logger.service';

export interface IOrderQueue<OrderClass> {
  enqueue(order: Order): OrderClass;
  dequeue(id: string): void;
  size(): number;
}

@Service('OrderQueueClassToken')
export class OrderQueue implements IOrderQueue<OrderClass>, OnModuleInit {
  private queue: OrderClass[] = [];

  constructor(
    private readonly orderService: OrderService,
    private readonly dealerService: DealerService,
    private readonly userService: UserService,
    private readonly loggerService: LoggerService,
  ) {}

  @Initializer([OrderService])
  async onModuleInit(): Promise<void> {
    await this.loadOrders();
  }

  async loadOrders(): Promise<void> {
    const orders = await this.orderService.getOrdersForQueue();

    this.loggerService.info('Order Queue Module is loading orders...');

    for (let index = 0; index < orders.length; index++) {
      const order = orders[index];
      const orderClass = new OrderClass(order);
      this.loggerService.info(
        `Order with id ${order.id} pushed to order queue`,
      );
      this.queue.push(orderClass);
    }

    this.loggerService.info(
      `Order Queue Module has been finished, loaded ${orders.length} orders.`,
    );
  }

  getQueue() {
    return this.queue;
  }

  get cancelledQueue() {
    return this.queue.filter(order => order.status === 'CANCELLED');
  }

  get deliveredQueue() {
    return this.queue.filter(order => order.status === 'DELIVERED');
  }

  get pendingQueue() {
    return this.queue.filter(order => order.status === 'PENDING');
  }

  get problemQueue() {
    return this.queue.filter(order => order.status === 'PROBLEM');
  }

  get sentQueue() {
    return this.queue.filter(order => order.status === 'SENT');
  }

  enqueue(order: Order): OrderClass {
    const orderClass = new OrderClass(order);

    this.queue.push(orderClass);

    return orderClass;
  }

  dequeue(id: string): void {
    this.queue = this.queue.filter(order => order.id !== id);
  }

  dequeueByOrderId(id: string): void {
    this.queue = this.queue.filter(z => z.order.id !== id);
  }

  getById(id: string) {
    return this.queue.find(o => o.id === id);
  }

  getByOrderId(id: string) {
    return this.queue.find(o => o.order.id === id);
  }

  size(): number {
    return this.queue.length;
  }

  setCoordinatesTo(id: string, coordinates: ICoordinates) {
    const index = this.queue.findIndex(x => x.id === id);

    this.queue[index].coordinates = coordinates;
  }

  async areThereAvailableDealers(): Promise<boolean> {
    const dealersCount = await this.dealerService.getAvailableDealersCount();

    return dealersCount > 0;
  }
}
