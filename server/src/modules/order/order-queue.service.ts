import { Service } from 'fastify-decorators';
import { Order } from './order.entity';
import { OrderService } from './order.service';

interface IOrderQueue {}

@Service('OrderQueueServiceToken')
export class OrderQueue implements IOrderQueue {
	constructor(private readonly orderService: OrderService) {}
}
