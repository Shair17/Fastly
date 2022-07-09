import { Repository } from 'typeorm';
import { Service, Initializer } from 'fastify-decorators';
import { DataSourceProvider } from '../../database/DataSourceProvider';
import { Order } from './order.entity';
import { UserService } from '../user/user.service';
import { Unauthorized } from 'http-errors';
import { OrderStatus } from '../../shared/enums/order-status.enum';

@Service('OrderServiceToken')
export class OrderService {
	private orderRepository: Repository<Order>;

	constructor(
		private readonly dataSourceProvider: DataSourceProvider,
		private readonly userService: UserService
	) {}

	@Initializer([DataSourceProvider])
	async init(): Promise<void> {
		this.orderRepository =
			this.dataSourceProvider.dataSource.getRepository(Order);
	}

	async getOrdersByStatus(status: OrderStatus) {
		return this.orderRepository.findBy({ status });
	}

	async createOrder(userId: string) {
		const user = await this.userService.getById(userId);

		// TODO: fix this later
		if (!user) throw new Unauthorized();

		const newOrder = new Order();
		// TODO
	}

	// TODO: borrar luego!!
	async getOrdersFromUser() {
		const user = await this.userService.getById(
			'fb67b442-d31c-4e53-bfbe-6037e6ea0a26'
		);

		if (!user) throw new Unauthorized();

		return user.orders;
	}
}
