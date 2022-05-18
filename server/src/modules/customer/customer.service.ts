import { Service, Initializer } from 'fastify-decorators';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { DataSourceProvider } from '../../database/DataSourceProvider';
import { Unauthorized } from 'http-errors';

@Service()
export class CustomerService {
	private customerRepository: Repository<Customer>;

	constructor(private readonly dataSourceProvider: DataSourceProvider) {}

	@Initializer([DataSourceProvider])
	async init(): Promise<void> {
		this.customerRepository =
			this.dataSourceProvider.dataSource.getRepository(Customer);
	}

	count() {
		return this.customerRepository.count();
	}

	async me(customerId: string): Promise<Omit<Customer, 'password'>> {
		const customer = await this.getById(customerId);

		if (!customer) {
			throw new Unauthorized();
		}

		const { password, ...restOfCustomer } = customer;

		return restOfCustomer;
	}

	getById(id: string) {
		return this.customerRepository.findOneBy({ id });
	}

	getByEmail(email: string): Promise<Customer | null> {
		return this.customerRepository.findOneBy({ email });
	}

	save(customer: Customer) {
		return this.customerRepository.save(customer);
	}
}
