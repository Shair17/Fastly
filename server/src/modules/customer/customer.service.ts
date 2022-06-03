import { Service, Initializer } from 'fastify-decorators';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { DataSourceProvider } from '../../database/DataSourceProvider';
import { Unauthorized } from 'http-errors';

@Service('CustomerServiceToken')
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

	async me(customerId: string) {
		const customer = await this.getById(customerId);

		if (!customer) {
			throw new Unauthorized();
		}

		const { password, calcUserAge, ...restOfCustomer } = customer;

		return restOfCustomer;
	}

	async getCustomers(): Promise<Customer[]> {
		return this.customerRepository.find({
			select: [
				'address',
				'age',
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
				'phone',
				'stores',
				'updatedAt',
			],
		});
	}

	getById(id: string) {
		return this.customerRepository.findOneBy({ id });
	}

	getByEmail(email: string): Promise<Customer | null> {
		return this.customerRepository.findOneBy({ email });
	}

	save(customer: Partial<Customer>) {
		return this.customerRepository.save(customer);
	}
}
