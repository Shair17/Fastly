import { Initializer, Service } from 'fastify-decorators';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserAddress } from './user-address.entity';
import { DataSourceProvider } from '../../database/DataSourceProvider';
import {
	Unauthorized,
	InternalServerError,
	NotFound,
	BadRequest,
} from 'http-errors';
import {
	AddAddressBodyType,
	UpdateNewUserBodyType,
	UpdateUserProfileBodyType,
} from './user.schema';
import { CloudinaryService } from '../../shared/services/cloudinary.service';
import { trimStrings } from '../../utils/trimStrings';
import { MAX_USER_ADDRESSES } from '../../constants/app.constants';

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

	async myAddress(userId: string, addressId: string) {
		const user = await this.getById(userId);

		if (!user) {
			throw new Unauthorized();
		}

		const addresses = user.addresses;

		if (!addresses) {
			throw new NotFound();
		}

		const foundAddresses = await this.userRepository.find({
			where: {
				id: userId,
				addresses: {
					id: addressId,
				},
			},
			select: {
				addresses: true,
			},
		});
		console.log({ foundAddresses });
		console.log(
			'found address from database',
			foundAddresses.find((address) => address.id === addressId)
		);

		const foundAddress = addresses.find((address) => address.id === addressId);

		if (!foundAddress) {
			throw new NotFound();
		}

		return {
			...foundAddress,
		};
	}

	async deleteAddress(userId: string, addressId: string) {
		const user = await this.getById(userId);

		if (!user) {
			throw new Unauthorized();
		}

		if (!user.addresses) {
			throw new NotFound();
		}

		user.addresses = user.addresses.filter(
			(address) => address.id !== addressId
		);

		await this.save(user);

		return {
			statusCode: 200,
			message: `Address with id ${addressId} was deleted`,
			success: true,
		};
	}

	async addAddress(userId: string, address: AddAddressBodyType) {
		const user = await this.getById(userId);

		if (!user) {
			throw new Unauthorized();
		}

		if (user.addresses && user.addresses.length >= MAX_USER_ADDRESSES) {
			throw new BadRequest('too_many_addresses');
		}

		const [city, instructions, name, street] = trimStrings(
			address.city,
			address.instructions,
			address.name,
			address.street
		);

		const newAddress = new UserAddress();
		newAddress.city = city;
		newAddress.instructions = instructions;
		newAddress.name = name;
		newAddress.street = street;
		newAddress.latitude = address.latitude;
		newAddress.longitude = address.longitude;
		newAddress.tag = address.tag;
		newAddress.zip = address.zip;

		// if (!user.addresses) {
		// 	user.addresses = [newAddress];
		// } else {
		// 	user.addresses = [...user.addresses, newAddress];
		// }

		user.addresses = [newAddress];

		await this.save(user);

		return {
			statusCode: 200,
			id: userId,
			addresses: user.addresses,
			message: `Address was added`,
			success: true,
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

	async myFavorites(userId: string) {
		const user = await this.getById(userId);

		if (!user) {
			throw new Unauthorized();
		}

		return {
			id: userId,
			favorites: user.favorites,
		};
	}

	async myFavorite(userId: string, favoriteId: string) {
		const user = await this.getById(userId);

		if (!user) {
			throw new Unauthorized();
		}

		const favorites = user.favorites;

		if (!favorites) {
			throw new NotFound();
		}

		const foundFavorites = await this.userRepository.find({
			where: {
				id: userId,
				addresses: {
					id: favoriteId,
				},
			},
			select: {
				addresses: true,
			},
		});
		console.log({ foundFavorites });
		console.log(
			'found favorites from database',
			foundFavorites.find((favorite) => favorite.id === favoriteId)
		);

		const foundFavorite = favorites.find(
			(favorite) => favorite.id === favoriteId
		);

		if (!foundFavorite) {
			throw new NotFound();
		}

		return {
			...foundFavorite,
		};
	}

	async isNewUser(userId: string): Promise<boolean> {
		const user = await this.getById(userId);

		if (!user) {
			throw new Unauthorized();
		}

		return user.isNewUser;
	}

	async updateUserProfile(userId: string, data: UpdateUserProfileBodyType) {
		const [dni, email, phone] = trimStrings(data.dni, data.email, data.phone);
		const user = await this.getById(userId);

		if (!user) {
			throw new Unauthorized();
		}

		if (
			data.avatar === undefined &&
			user.dni === dni &&
			user.email === email &&
			user.phone === phone
		) {
			console.log('no hay cambios');
			return {
				statusCode: 200,
				success: true,
				modified: false,
			};
		}

		try {
			if (data.avatar) {
				const upload = await this.cloudinaryService.upload(
					data.avatar,
					`${user.name.toLowerCase().replace(/\s/g, '_')}@${user.facebookId}`
				);
				console.log(upload);
				user.avatar = upload.secure_url;
			}

			user.dni = dni;
			user.email = email;
			user.phone = phone;

			await this.save(user);
		} catch (error) {
			console.log(error);
			throw new InternalServerError();
		}

		return {
			statusCode: 200,
			success: true,
			modified: true,
		};
	}

	save(user: Partial<User>): Promise<Partial<User> & User> {
		return this.userRepository.save(user);
	}
}
