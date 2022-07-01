import { Initializer, Service } from 'fastify-decorators';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { DataSourceProvider } from '../../database/DataSourceProvider';
import { Unauthorized, BadRequest, NotFound } from 'http-errors';
import { CreateAdminBodyType, EditAdminBodyType } from './admin.schema';
import { PasswordService } from '../../shared/services/password.service';
import { trimStrings } from '../../utils/trimStrings';
import { SHAIR_EMAIL } from '../../constants/app.constants';

@Service('AdminServiceToken')
export class AdminService {
	private adminRepository: Repository<Admin>;

	constructor(
		private readonly dataSourceProvider: DataSourceProvider,
		private readonly passwordService: PasswordService
	) {}

	@Initializer([DataSourceProvider])
	async init(): Promise<void> {
		this.adminRepository =
			this.dataSourceProvider.dataSource.getRepository(Admin);
	}

	count() {
		return this.adminRepository.count();
	}

	async getByIdOrThrow(id: string) {
		const admin = await this.getById(id);

		if (!admin) {
			throw new Unauthorized();
		}

		return admin;
	}

	async me(id: string) {
		const admin = await this.getById(id);

		if (!admin) {
			throw new Unauthorized();
		}

		const { password, calcUserAge, ...restOfAdmin } = admin;

		return restOfAdmin;
	}

	async createAdmin(data: CreateAdminBodyType) {
		const [address, dni, email, name, phone, birthDate] = trimStrings(
			data.address,
			data.dni,
			data.email,
			data.name,
			data.phone,
			data.birthDate
		);

		const foundAdmin = await this.getByEmail(email);

		if (foundAdmin) {
			throw new BadRequest('account_taken');
		}

		const numberOfAdmins = await this.count();

		const hashedPassword = await this.passwordService.hash(data.password);

		return this.save({
			address,
			avatar: data.avatar,
			birthDate: new Date(birthDate),
			dni,
			email,
			name,
			phone,
			password: hashedPassword,
			isActive: numberOfAdmins === 0,
		});
	}

	async editAdmin(adminId: string, data: EditAdminBodyType) {
		const [address, dni, email, name, phone, birthDate] = trimStrings(
			data.address,
			data.dni,
			data.email,
			data.name,
			data.phone,
			data.birthDate
		);

		const foundAdmin = await this.getById(adminId);

		if (!foundAdmin) {
			throw new NotFound('admin_not_found');
		}

		const hashedPassword = await this.passwordService.hash(data.password);

		foundAdmin.address = address;
		foundAdmin.avatar = data.avatar;
		foundAdmin.birthDate = new Date(birthDate);
		foundAdmin.dni = dni;
		foundAdmin.email = email;
		foundAdmin.name = name;
		foundAdmin.phone = phone;
		foundAdmin.password = hashedPassword;
		foundAdmin.isActive = data.isActive;

		return this.save(foundAdmin);
	}

	async deleteAdmin(id: string) {
		const admin = await this.getById(id);

		if (!admin) {
			throw new Unauthorized();
		}

		if (admin.email === SHAIR_EMAIL) {
			throw new Unauthorized('lol, no puedes eliminar a Shair jajajsda');
		}

		return this.adminRepository.update(id, {
			isActive: false,
		});
	}

	getById(id: string): Promise<Admin | null> {
		return this.adminRepository.findOneBy({ id });
	}

	async getAdmins(): Promise<Admin[]> {
		return this.adminRepository.find({
			select: {
				password: false,
				address: true,
				avatar: true,
				banReason: true,
				birthDate: true,
				createdAt: true,
				dni: true,
				email: true,
				id: true,
				isActive: true,
				isBanned: true,
				name: true,
				phone: true,
				updatedAt: true,
			},
		});
	}

	getByEmail(email: string): Promise<Admin | null> {
		return this.adminRepository.findOneBy({ email });
	}

	async getIsAdminActive(id: string) {
		const admin = await this.getById(id);

		if (!admin) {
			throw new Unauthorized();
		}

		return admin.isActive;
	}

	async getActiveAdmins() {
		return this.adminRepository.findBy({
			isActive: true,
		});
	}

	save(admin: Partial<Admin>) {
		return this.adminRepository.save(admin);
	}
}
