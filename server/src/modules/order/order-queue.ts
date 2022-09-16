import {FastifyInstance} from 'fastify';
import {
  FastifyInstanceToken,
  getInstanceByToken,
  Initializer,
  Service,
} from 'fastify-decorators';
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
  private readonly fastify =
    getInstanceByToken<FastifyInstance>(FastifyInstanceToken);

  private queue: OrderClass[] = [];

  constructor(
    private readonly orderService: OrderService,
    private readonly dealerService: DealerService,
    private readonly loggerService: LoggerService,
  ) {}

  @Initializer()
  onModuleInit() {
    this.loadOrders();
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

  getQueue(): OrderClass[] {
    return this.queue;
  }

  getCancelledQueue(): OrderClass[] {
    return this.queue.filter(order => order.status === 'CANCELLED');
  }

  getDeliveredQueue(): OrderClass[] {
    return this.queue.filter(order => order.status === 'DELIVERED');
  }

  getPendingQueue(): OrderClass[] {
    return this.queue.filter(order => order.status === 'PENDING');
  }

  getProblemQueue(): OrderClass[] {
    return this.queue.filter(order => order.status === 'PROBLEM');
  }

  getSentQueue(): OrderClass[] {
    return this.queue.filter(order => order.status === 'SENT');
  }

  enqueue(order: Order): OrderClass {
    const orderClass = new OrderClass(order);
    this.queue.push(orderClass);
    this.updateOrderQueueSocketEvents();

    return orderClass;
  }

  dequeue(id: string): void {
    this.queue = this.queue.filter(order => order.id !== id);
    this.updateOrderQueueSocketEvents();
  }

  dequeueByOrderId(id: string): void {
    this.queue = this.queue.filter(z => z.order.id !== id);
    this.updateOrderQueueSocketEvents();
  }

  getById(id: string): OrderClass | undefined {
    return this.queue.find(o => o.id === id);
  }

  getByOrderId(id: string): OrderClass | undefined {
    return this.queue.find(o => o.order.id === id);
  }

  size(): number {
    return this.queue.length;
  }

  setCoordinatesTo(id: string, coordinates: ICoordinates): void {
    const index = this.queue.findIndex(x => x.id === id);

    if (index !== -1) {
      this.queue[index].coordinates = coordinates;
      // TODO: verificar si esto se puede hacer de una mejor manera para actualizar las coordeadas del pedido en especifico
      this.updateOrderQueueSocketEvents();
    } else {
      this.loggerService.warn(`Order in queue with id '${id}' doesn't exists.`);
    }
  }

  async areThereAvailableDealers(): Promise<boolean> {
    const dealersCount = await this.dealerService.getAvailableDealersCount();

    return dealersCount > 0;
  }

  updateOrderQueueSocketEvents() {
    this.fastify.io.emit('ORDERS_QUEUE', this.getQueue());
    this.fastify.io.emit('ORDERS_PENDING_QUEUE', this.getPendingQueue());
    this.fastify.io.emit('ORDERS_DELIVERED_QUEUE', this.getDeliveredQueue());
    this.fastify.io.emit('ORDERS_CANCELLED_QUEUE', this.getCancelledQueue());
    this.fastify.io.emit('ORDERS_PROBLEM_QUEUE', this.getProblemQueue());
    this.fastify.io.emit('ORDERS_SENT_QUEUE', this.getSentQueue());
  }
}
