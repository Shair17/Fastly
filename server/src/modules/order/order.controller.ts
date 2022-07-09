import { FastifyInstance } from 'fastify';
import {
	Controller,
	FastifyInstanceToken,
	GET as Get,
	getInstanceByToken,
} from 'fastify-decorators';
import { OrderStatus } from '../../shared/enums/order-status.enum';
import { OrderService } from './order.service';
import { Request, Reply } from '../../interfaces/http.interfaces';

@Controller('/orders')
export class OrderController {
	private readonly fastify: FastifyInstance =
		getInstanceByToken<FastifyInstance>(FastifyInstanceToken);

	constructor(private readonly orderService: OrderService) {}

	private get io() {
		return this.fastify.io;
	}

	@Get('/')
	async getOrders(request: Request, reply: Reply) {
		return {};
	}
}
