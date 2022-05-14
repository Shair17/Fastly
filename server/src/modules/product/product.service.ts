import { Service, Initializer } from 'fastify-decorators';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { DataSourceProvider } from '../../database/DataSourceProvider';

@Service()
export class ProductService {
	private productRepository: Repository<Product>;

	constructor(private readonly dataSourceProvider: DataSourceProvider) {}

	@Initializer([DataSourceProvider])
	async init(): Promise<void> {
		this.productRepository =
			this.dataSourceProvider.dataSource.getRepository(Product);
	}
}
