import { Service, Initializer } from 'fastify-decorators';
import { Repository } from 'typeorm';
import { Dealer } from './dealer.entity';
import { DataSourceProvider } from '../../database/DataSourceProvider';
import { Unauthorized } from 'http-errors';

@Service()
export class DealerService {
	private dealerRepository: Repository<Dealer>;

	constructor(private readonly dataSourceProvider: DataSourceProvider) {}

	@Initializer([DataSourceProvider])
	async init(): Promise<void> {
		this.dealerRepository =
			this.dataSourceProvider.dataSource.getRepository(Dealer);
	}

	count() {
		return this.dealerRepository.count();
	}

	async me(dealerId: string) {
		const dealer = await this.getById(dealerId);

		if (!dealer) {
			throw new Unauthorized();
		}

		const { password, calcUserAge, ...restOfDealer } = dealer;

		return restOfDealer;
	}

	getById(id: string) {
		return this.dealerRepository.findOneBy({ id });
	}

	getByEmail(email: string): Promise<Dealer | null> {
		return this.dealerRepository.findOneBy({ email });
	}

	save(dealer: Partial<Dealer>) {
		return this.dealerRepository.save(dealer);
	}
}
