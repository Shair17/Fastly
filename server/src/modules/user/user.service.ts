import { Initializer, Service } from 'fastify-decorators';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserAddress } from './user-address.entity';
import { DataSourceProvider } from '../../database/DataSourceProvider';
import { Unauthorized, InternalServerError } from 'http-errors';
import { UpdateNewUserBodyType } from './user.schema';
import { CloudinaryService } from '../../shared/services/cloudinary.service';

@Service('UserServiceToken')
export class UserService {
	private userRepository: Repository<User>;

	constructor(
		private readonly dataSourceProvider: DataSourceProvider,
		private readonly cloudinaryService: CloudinaryService
	) {}

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

		if (user.addresses === undefined) {
			return {
				statusCode: 200,
				success: true,
				isNewUser: user.isNewUser,
			};
		}

		try {
			// avatar should be base64 encode image
			if (avatar) {
				const upload = await this.cloudinaryService.upload(
					avatar,
					`${user.name.toLowerCase().replace(/\s/g, '_')}@${user.facebookId}`
				);
				console.log(upload);
				user.avatar = upload.secure_url;
			}
			user.email = email;
			user.phone = phone;
			user.dni = dni;

			const userAddress = new UserAddress();

			userAddress.name = address.name;
			userAddress.street = address.street;
			userAddress.instructions = address.instructions;
			userAddress.zip = address.zip;
			userAddress.city = address.city;
			userAddress.tag = address.tag;
			userAddress.latitude = address.latitude;
			userAddress.longitude = address.longitude;

			await this.userRepository.manager.save(userAddress);

			user.addresses = [userAddress];

			await this.save(user);
		} catch (error) {
			console.log(error);
			throw new InternalServerError();
		}

		const updatedUser = await this.getById(userId);

		if (!updatedUser) throw new Unauthorized();

		return {
			statusCode: 200,
			success: true,
			isNewUser: updatedUser.isNewUser,
		};
	}

	save(user: Partial<User>): Promise<Partial<User> & User> {
		return this.userRepository.save(user);
	}
}
