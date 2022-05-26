import { Service, Initializer } from 'fastify-decorators';
import { DataSourceProvider } from '../../database/DataSourceProvider';
import { Repository } from 'typeorm';
import { Store } from './store.entity';
import { NotFound } from 'http-errors';

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
}
