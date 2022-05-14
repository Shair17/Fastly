import { Service, Initializer } from 'fastify-decorators';
import { Repository } from 'typeorm';
import { Dealer } from './dealer.entity';
import { DataSourceProvider } from '../../database/DataSourceProvider';

@Service()
export class DealerService {
	private dealerRepository: Repository<Dealer>;

	constructor(private readonly dataSourceProvider: DataSourceProvider) {}

	@Initializer([DataSourceProvider])
	async init(): Promise<void> {
		this.dealerRepository =
			this.dataSourceProvider.dataSource.getRepository(Dealer);
	}
}
