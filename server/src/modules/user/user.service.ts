import { Initializer, Service } from 'fastify-decorators';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { DataSourceProvider } from '../../database/DataSourceProvider';
import { Unauthorized } from 'http-errors';

@Service('UserServiceToken')
export class UserService {
	private userRepository: Repository<User>;

	constructor(private readonly dataSourceProvider: DataSourceProvider) {}

	@Initializer([DataSourceProvider])
	async init(): Promise<void> {
		this.userRepository =
			this.dataSourceProvider.dataSource.getRepository(User);
	}

	async me(userId: string): Promise<User> {
		const user = await this.getById(userId);

		if (!user) {
			throw new Unauthorized();
		}

		return user;
	}

	count(): Promise<number> {
		return this.userRepository.count();
	}

	// remove later
	getUsers() {
		return '';
	}

	getById(id: string): Promise<User | null> {
		return this.userRepository.findOneBy({ id });
	}

	getByFacebookUserID(facebookUserID: string): Promise<User | null> {
		return this.userRepository.findOne({
			where: { facebookId: facebookUserID },
		});
	}

	getByEmail(email: string): Promise<User | null> {
		return this.userRepository.findOneBy({ email });
	}

	save(user: Partial<User>): Promise<Partial<User> & User> {
		return this.userRepository.save(user);
	}
}
