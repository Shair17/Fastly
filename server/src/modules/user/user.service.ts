import { Initializer, Service } from 'fastify-decorators';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserAddress } from './user-address.entity';
import { DataSourceProvider } from '../../database/DataSourceProvider';
import { Unauthorized, InternalServerError } from 'http-errors';
import { UpdateNewUserBodyType } from './user.schema';

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

	async myAddresses(userId: string) {
		const user = await this.getById(userId);

		if (!user) {
			throw new Unauthorized();
		}

		return {
			id: user.id,
			addresses: user.addresses,
		};
	}

	count(): Promise<number> {
		return this.userRepository.count();
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

	async updateNewUser(data: UpdateNewUserBodyType, userId: string) {
		const { avatar, email, phone, dni, address } = data;
		const user = await this.getById(userId);

		if (!user) {
			throw new Unauthorized();
		}

		try {
			const userAddress = new UserAddress();
			userAddress.name = address.name;
			userAddress.street = address.street;
			userAddress.instructions = address.instructions;
			userAddress.zip = address.zip;
			userAddress.city = address.city;
			userAddress.tag = address.tag;
			userAddress.latitude = address.latitude;
			userAddress.longitude = address.longitude;

			await this.save({
				...user,
				avatar,
				email,
				phone,
				dni,
				addresses: [userAddress],
			});
		} catch (error) {
			console.log(error);
			throw new InternalServerError();
		}

		return {
			statusCode: 200,
			success: true,
		};
	}

	save(user: Partial<User>): Promise<Partial<User> & User> {
		return this.userRepository.save(user);
	}
}
