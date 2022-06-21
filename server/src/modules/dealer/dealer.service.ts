import { Service, Initializer } from 'fastify-decorators';
import { Repository } from 'typeorm';
import { Dealer } from './dealer.entity';
import { DataSourceProvider } from '../../database/DataSourceProvider';
import { Unauthorized, NotFound } from 'http-errors';

@Service('DealerServiceToken')
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

	async getDealers(): Promise<Dealer[]> {
		return this.dealerRepository.find({
			select: [
				'address',
				'age',
				'available',
				'avatar',
				'banReason',
				'birthDate',
				'createdAt',
				'dni',
				'email',
				'id',
				'isActive',
				'isBanned',
				'name',
				'orders',
				'phone',
				'ranking',
				'rankings',
				'updatedAt',
				'vehicle',
			],
		});
	}

	getById(id: string) {
		return this.dealerRepository.findOneBy({ id });
	}

	getByEmail(email: string): Promise<Dealer | null> {
		return this.dealerRepository.findOneBy({ email });
	}

	async getDealerRanking(id: string): Promise<number> {
		const dealer = await this.getById(id);

		if (!dealer) {
			throw new Unauthorized();
		}

		return dealer.ranking;
	}

	async getDealerRankings(id: string) {
		const dealer = await this.getById(id);

		if (!dealer) {
			throw new Unauthorized();
		}

		if (!dealer.rankings) {
			return {
				ranking: dealer.ranking,
				rankings: [],
			};
		}

		return {
			ranking: dealer.ranking,
			rankings: dealer.rankings,
		};
	}

	async getDealerIsAvailable(id: string) {
		const dealer = await this.getById(id);

		if (!dealer) {
			throw new Unauthorized();
		}

		return dealer.available;
	}

	async getAvailableDealers() {
		const dealers = await this.dealerRepository.findBy({
			isActive: true,
			available: true,
		});

		return dealers;
	}

	async getActiveDealers() {
		const dealers = await this.dealerRepository.findBy({ isActive: true });

		return dealers;
	}

	save(dealer: Partial<Dealer>) {
		return this.dealerRepository.save(dealer);
	}
}
