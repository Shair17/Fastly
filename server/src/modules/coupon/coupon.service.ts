import { Initializer, Service } from 'fastify-decorators';
import { Repository } from 'typeorm';
import { DataSourceProvider } from '../../database/DataSourceProvider';
import { Coupon } from './coupon.entity';

@Service('CouponServiceToken')
export class CouponService {
	private couponRepository: Repository<Coupon>;

	constructor(private readonly dataSourceProvider: DataSourceProvider) {}

	@Initializer([DataSourceProvider])
	async init(): Promise<void> {
		this.couponRepository =
			this.dataSourceProvider.dataSource.getRepository(Coupon);
	}
}
