import { Initializer, Service } from 'fastify-decorators';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { DataSourceProvider } from '../../database/DataSourceProvider';
import { Unauthorized } from 'http-errors';

@Service()
export class AdminService {
	private adminRepository: Repository<Admin>;

	constructor(private readonly dataSourceProvider: DataSourceProvider) {}

	@Initializer([DataSourceProvider])
	async init(): Promise<void> {
		this.adminRepository =
			this.dataSourceProvider.dataSource.getRepository(Admin);
	}

	count() {
		return this.adminRepository.count();
	}

	async me(id: string) {
		const admin = await this.getById(id);

		if (!admin) {
			throw new Unauthorized();
		}

		const { password, calcUserAge, ...restOfAdmin } = admin;

		return restOfAdmin;
	}

	getById(id: string): Promise<Admin | null> {
		return this.adminRepository.findOneBy({ id });
	}

	getByEmail(email: string): Promise<Admin | null> {
		return this.adminRepository.findOneBy({ email });
	}

	save(admin: Partial<Admin>) {
		return this.adminRepository.save(admin);
	}
}
