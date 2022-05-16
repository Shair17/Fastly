import { Initializer, Service } from 'fastify-decorators';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { DataSourceProvider } from '../../database/DataSourceProvider';

@Service()
export class UserService {
	private userRepository: Repository<User>;

	constructor(private readonly dataSourceProvider: DataSourceProvider) {}

	@Initializer([DataSourceProvider])
	async init(): Promise<void> {
		this.userRepository =
			this.dataSourceProvider.dataSource.getRepository(User);
	}

	count(): Promise<number> {
		return this.userRepository.count();
	}

	// remove later
	getUsers() {
		return '';
	}

	getUserById(id: string): Promise<User | null> {
		return this.userRepository.findOneBy({ id });
	}

	getUserByFacebookUserID(facebookUserID: string): Promise<User | null> {
		return this.userRepository.findOne({
			where: { facebookId: facebookUserID },
		});
	}

	getUserByEmail(email: string): Promise<User | null> {
		return this.userRepository.findOneBy({ email });
	}

	save(user: Partial<User>): Promise<Partial<User> & User> {
		return this.userRepository.save(user);
	}
}
