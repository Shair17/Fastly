import { Initializer, Service } from 'fastify-decorators';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserAddress } from './user-address.entity';
import { UserCart } from './user-cart.entity';
import { DataSourceProvider } from '../../database/DataSourceProvider';
import {
	Unauthorized,
	InternalServerError,
	NotFound,
	BadRequest,
} from 'http-errors';
import {
	AddAddressBodyType,
	AddItemCartBodyType,
	UpdateNewUserBodyType,
	UpdateUserProfileBodyType,
} from './user.schema';
import { CloudinaryService } from '../../shared/services/cloudinary.service';
import { trimStrings } from '../../utils/trimStrings';
import { MAX_USER_ADDRESSES } from '../../constants/app.constants';
import { ProductService } from '../product/product.service';
import { EditItemCartQuantityBodyType } from './user.schema';

@Service('UserServiceToken')
export class UserService {
	private userRepository: Repository<User>;

	constructor(
		private readonly dataSourceProvider: DataSourceProvider,
		private readonly productService: ProductService,
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

	async getByIdOrThrow(id: string) {
		const user = await this.getById(id);

		if (!user) {
			throw new Unauthorized();
		}

		return user;
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

		if (user.addresses.length <= 1) {
			throw new BadRequest();
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
		// newAddress.user = user;

		await this.userRepository.manager.save(newAddress);

		if (!user.addresses) {
			user.addresses = [newAddress];
		} else {
			user.addresses = [...user.addresses, newAddress];
		}

		// user.addresses = [user.addresses, newAddress];

		await this.save(user);

		return {
			statusCode: 200,
			id: userId,
			addresses: user.addresses,
			message: `Address was added`,
			success: true,
		};
	}

	async myCart(userId: string) {
		const user = await this.getById(userId);

		if (!user) {
			throw new Unauthorized();
		}

		if (user.cart === undefined || !user.cart) {
			return {
				id: userId,
				cart: [],
			};
		}

		return {
			id: userId,
			cart: user.cart,
		};
	}

	async myItemCart(userId: string, itemCartId: string) {
		const user = await this.getById(userId);

		if (!user) {
			throw new Unauthorized();
		}

		const cart = user.cart;

		if (!cart) {
			throw new NotFound();
		}

		const foundCart = await this.userRepository.find({
			where: {
				id: userId,
				cart: {
					id: itemCartId,
				},
			},
			select: {
				cart: true,
			},
		});
		console.log({ foundCart });
		console.log(
			'found address from database',
			foundCart
				.find((user) => user.id === userId)
				?.cart?.find((cart) => cart.id === itemCartId)
		);

		const foundItemCart = foundCart
			.find((user) => user.id === userId)
			?.cart?.find((cart) => cart.id === itemCartId);

		if (!foundItemCart) {
			throw new NotFound();
		}

		return {
			...foundItemCart,
		};
	}

	async addItemCart(
		userId: string,
		{ productId, quantity }: AddItemCartBodyType
	) {
		const user = await this.getById(userId);

		if (!user) {
			throw new Unauthorized();
		}

		const product = await this.productService.getById(productId);

		if (!product) {
			throw new BadRequest(`Product doesn't exists`);
		}

		const newCart = new UserCart();
		newCart.product = product;
		newCart.quantity = quantity;
		newCart.user = user;

		user.cart = [newCart];

		await this.save(user);

		return {
			statusCode: 200,
			id: userId,
			cart: user.cart,
			message: `Item Cart was added`,
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

	async deleteItemCart(userId: string, itemCartId: string) {
		const user = await this.getById(userId);

		if (!user) {
			throw new Unauthorized();
		}

		if (!user.cart) {
			throw new NotFound();
		}

		user.cart = user.cart.filter((cart) => cart.id !== itemCartId);

		await this.save(user);

		return {
			statusCode: 200,
			success: true,
			message: `Item Cart with id ${itemCartId} was deleted`,
		};
	}

	async editItemCartQuantity(
		userId: string,
		itemCartId: string,
		{ quantity }: EditItemCartQuantityBodyType
	) {
		const user = await this.getById(userId);

		if (!user) {
			throw new Unauthorized();
		}

		if (!user.cart) {
			throw new NotFound();
		}

		const itemCart = user.cart.find((cart) => cart.id === itemCartId);
		itemCart!.quantity = quantity;

		user.cart = itemCart ? [itemCart] : undefined;

		await this.save(user);

		return {
			statusCode: 200,
			success: true,
			message: `Item Cart with id ${itemCartId} was edited quantity set to ${quantity}`,
		};
	}

	async deleteCart(userId: string) {
		const user = await this.getById(userId);

		if (!user) {
			throw new Unauthorized();
		}

		user.cart = undefined;

		await this.save(user);

		return {
			statusCode: 200,
			success: true,
			message: 'Cart was deleted',
		};
	}

	async deleteFavorite(userId: string, favoriteId: string) {
		const user = await this.getById(userId);

		if (!user) {
			throw new Unauthorized();
		}

		if (!user.favorites) {
			throw new NotFound();
		}

		user.favorites = user.favorites.filter(
			(favorite) => favorite.id !== favoriteId
		);

		await this.save(user);

		return {
			statusCode: 200,
			success: true,
			message: 'Favorites was deleted',
		};
	}

	async deleteFavorites(userId: string) {
		const user = await this.getById(userId);

		if (!user) {
			throw new Unauthorized();
		}

		user.favorites = undefined;

		await this.save(user);

		return {
			statusCode: 200,
			success: true,
			message: 'Favorites was deleted',
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
				favorites: {
					id: favoriteId,
				},
			},
			select: {
				favorites: true,
			},
		});
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

	// TODO: agregar paginación
	async myOrders(userId: string) {
		const user = await this.getById(userId);

		if (!user) {
			throw new Unauthorized();
		}

		if (!user.orders) {
			return {
				id: userId,
				orders: [],
			};
		}

		return {
			id: userId,
			orders: user.orders,
		};
	}

	save(user: Partial<User>): Promise<Partial<User> & User> {
		return this.userRepository.save(user);
	}
}
