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

	me(dealerId: string) {
		return '';
	}

	getByEmail(email: string): Promise<Dealer | null> {
		return this.dealerRepository.findOneBy({ email });
	}

	save(dealer: Dealer) {
		return this.dealerRepository.save(dealer);
	}
}
