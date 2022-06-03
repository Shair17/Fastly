import { Service, Initializer } from 'fastify-decorators';
import { DataSourceProvider } from '../../database/DataSourceProvider';
import { Repository } from 'typeorm';
import { Store, StoreCategory } from './store.entity';
import { NotFound, BadRequest } from 'http-errors';
import { CreateStoreBodyType } from './store.schema';
import { trimStrings } from '../../utils/trimStrings';
import { AdminService } from '../admin/admin.service';

@Service('StoreServiceToken')
export class StoreService {
	private storeRepository: Repository<Store>;

	constructor(
		private readonly dataSourceProvider: DataSourceProvider,
		private readonly adminService: AdminService
	) {}

	@Initializer([DataSourceProvider])
	async init(): Promise<void> {
		this.storeRepository =
			this.dataSourceProvider.dataSource.getRepository(Store);
	}

	getStores(): Promise<Store[]> {
		return this.storeRepository.find();
	}

	getCategories() {
		return {
			categories: Object.values(StoreCategory),
		};
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

	async createStore(data: CreateStoreBodyType) {
		const [owner, address, name] = trimStrings(
			data.owner,
			data.address,
			data.name
		);

		const ownerFound = await this.adminService.getById(owner);

		if (!ownerFound) {
			throw new BadRequest();
		}

		const newStore = await this.storeRepository.save({
			address,
			category: data.category,
			categoryDescription: data.categoryDescription,
			closeTime: data.closeTime,
			openTime: data.openTime,
			description: data.description,
			logo: data.logo,
			name,
			owner: ownerFound,
		});

		return {
			statusCode: 200,
			store: newStore,
			success: true,
		};
	}

	save(store: Partial<Store>): Promise<Partial<Store> & Store> {
		return this.storeRepository.save(store);
	}
}
