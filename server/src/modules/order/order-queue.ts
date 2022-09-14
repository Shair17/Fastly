import {Initializer, Service} from 'fastify-decorators';
import {OrderService} from './order.service';
import {OrderClass, type ICoordinates} from '../../shared/classes/order.class';
import {Order} from '@prisma/client';
import {DealerService} from '../dealer/dealer.service';
import type {OnModuleInit} from '../../interfaces/module';
import {LoggerService} from '../../shared/services/logger.service';

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
    private readonly loggerService: LoggerService,
  ) {}

  @Initializer()
  async onModuleInit(): Promise<void> {
    await this.loadOrders();
  }

  async loadOrders(): Promise<void> {
    const orders = await this.orderService.getOrdersForQueue();

    if (orders.length > 0) {
      this.loggerService.info('Order Queue Module is loading orders...');

      for (let index = 0; index < orders.length; index++) {
        const order = orders[index];
        const orderClass = new OrderClass(order);
        this.queue.push(orderClass);
        this.loggerService.info(
          `Order with id ${order.id} pushed to order queue`,
        );
      }

      this.loggerService.info(
        `Order Queue Module has been finished, loaded ${orders.length} orders.`,
      );
    }
  }

  getQueue() {
    return this.queue;
  }

  getCancelledQueue() {
    return this.queue.filter(order => order.status === 'CANCELLED');
  }

  getDeliveredQueue() {
    return this.queue.filter(order => order.status === 'DELIVERED');
  }

  getPendingQueue() {
    return this.queue.filter(order => order.status === 'PENDING');
  }

  getProblemQueue() {
    return this.queue.filter(order => order.status === 'PROBLEM');
  }

  getSentQueue() {
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

    if (index !== -1) {
      this.queue[index].coordinates = coordinates;
    } else {
      this.loggerService.warn(`Order in queue with id='${id}' doesn't exists.`);
    }
  }

  async areThereAvailableDealers(): Promise<boolean> {
    const dealersCount = await this.dealerService.getAvailableDealersCount();

    return dealersCount > 0;
  }
}
