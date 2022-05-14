import { FastifyInstance } from 'fastify';
import {
	Service,
	Initializer,
	Destructor,
	FastifyInstanceToken,
	getInstanceByToken,
} from 'fastify-decorators';
import { DataSource } from 'typeorm';
import { Admin } from '../modules/admin/admin.entity';
import { Customer } from '../modules/customer/customer.entity';
import { Dealer } from '../modules/dealer/dealer.entity';
import { User } from '../modules/user/user.entity';
import { Order } from '../modules/order/order.entity';
import { Product } from '../modules/product/product.entity';
import { Store } from '../modules/store/store.entity';

@Service()
export class DataSourceProvider {
	private readonly fastify =
		getInstanceByToken<FastifyInstance>(FastifyInstanceToken);

	private _dataSource = new DataSource({
		type: 'mysql',
		host: this.fastify.config.DATABASE_HOST,
		port: +this.fastify.config.DATABASE_PORT,
		username: this.fastify.config.DATABASE_USERNAME,
		password: this.fastify.config.DATABASE_PASSWORD,
		database: this.fastify.config.DATABASE_NAME,
		entities: [Admin, Customer, Dealer, User, Order, Product, Store],
		synchronize: true,
	});

	public get dataSource(): DataSource {
		return this._dataSource;
	}

	@Initializer()
	async init(): Promise<void> {
		let startTime = performance.now();
		await this._dataSource.initialize();
		let endTime = performance.now();

		this.fastify.log.info(
			`TypeORM Module has established the connection to the database and it took ${Math.floor(
				endTime - startTime
			)} ms`
		);
	}

	@Destructor()
	async destroy(): Promise<void> {
		await this._dataSource.destroy();
	}
}