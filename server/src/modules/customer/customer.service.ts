import { Service, Initializer } from 'fastify-decorators';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { DataSourceProvider } from '../../database/DataSourceProvider';

@Service()
export class CustomerService {
	private customerRepository: Repository<Customer>;

	constructor(private readonly dataSourceProvider: DataSourceProvider) {}

	@Initializer([DataSourceProvider])
	async init(): Promise<void> {
		this.customerRepository =
			this.dataSourceProvider.dataSource.getRepository(Customer);
	}

	me(customerId: string) {
		return '';
	}

	getByEmail(email: string): Promise<Customer | null> {
		return this.customerRepository.findOneBy({ email });
	}

	save(customer: Customer) {
		return this.customerRepository.save(customer);
	}
}
