import { Service, Initializer } from 'fastify-decorators';
import { DataSourceProvider } from '../../database/DataSourceProvider';
import { StoreCategory } from '../../shared/enums/store-categories.enum';
import { ChildEntity, Repository } from 'typeorm';
import { Store } from './store.entity';
import { NotFound, BadRequest } from 'http-errors';

@Service('StoreServiceToken')
export class StoreService {
	private storeRepository: Repository<Store>;

	constructor(private readonly dataSourceProvider: DataSourceProvider) {}

	@Initializer([DataSourceProvider])
	async init(): Promise<void> {
		this.storeRepository =
			this.dataSourceProvider.dataSource.getRepository(Store);
	}

	getStores(): Promise<Store[]> {
		return this.storeRepository.find();
	}

	async getById(id: string): Promise<Store> {
		const store = await this.storeRepository.findOneBy({ id });

		if (!store) {
			throw new NotFound();
		}

		return store;
	}

	async getByCategory(category: string): Promise<Store[]> {
		const match = Object.keys(StoreCategory)
			.map((c) => c.toLowerCase())
			.includes(category);

		if (!match) {
			throw new BadRequest();
		}

		return this.storeRepository.findBy({
			category:
				StoreCategory[category.toUpperCase() as keyof typeof StoreCategory],
		});
	}
}
