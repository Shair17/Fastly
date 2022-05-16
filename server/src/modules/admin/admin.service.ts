import { Initializer, Service } from 'fastify-decorators';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { DataSourceProvider } from '../../database/DataSourceProvider';

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

	getAdminById(id: string): Promise<Admin | null> {
		return this.adminRepository.findOneBy({ id });
	}

	getAdminByEmail(email: string): Promise<Admin | null> {
		return this.adminRepository.findOneBy({ email });
	}
}
