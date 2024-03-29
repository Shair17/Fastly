import {Service} from 'fastify-decorators';
import {DatabaseService} from '../../database/DatabaseService';
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
  GetMyUserOrdersQueryStringType,
} from './user.schema';
import {trimStrings} from '../../utils/trimStrings';
import {MAX_USER_ADDRESSES} from '../../constants/app';
import {ProductService} from '../product/product.service';
import {EditItemCartQuantityBodyType} from './user.schema';
import {User, UserAddress, UserCart, Product} from '@prisma/client';
import {checkIsNewUser} from '../../utils/checkIsNewUser';
import {AvatarService, CloudinaryService} from '../../shared/services';
import {isString} from '../../utils';

@Service('UserServiceToken')
export class UserService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly productService: ProductService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly avatarService: AvatarService,
  ) {}

  async getUsers() {
    return this.databaseService.user.findMany();
  }

  async me(userId: string) {
    const user = await this.getById(userId);

    if (!user) {
      throw new Unauthorized();
    }

    return user;
  }

  async myAddresses(userId: string) {
    const user = await this.getByIdOrThrow(userId);

    return {
      id: user.id,
      addresses: user.addresses,
    };
  }

  async toggleBanUserByAdmin(id: string, reason?: string) {
    const user = await this.getByIdOnlyUserOrThrow(id);

    await this.banUser(user.id, !user.isBanned, reason);

    return {
      statusCode: 200,
      message: `User with id ${user.id} was ${
        user.isBanned ? 'unbanned' : 'banned'
      }.`,
      success: true,
    };
  }

  async getByIdOnlyUserOrThrow(id: string) {
    const user = await this.databaseService.user.findUnique({where: {id}});

    if (!user) {
      throw new Unauthorized();
    }

    return user;
  }

  async getByIdOrThrow(id: string) {
    const user = await this.getById(id);

    if (!user) {
      throw new Unauthorized();
    }

    return user;
  }

  async getUserAddressByIdOrThrow(id: string) {
    const userAddress = await this.databaseService.userAddress.findUnique({
      where: {id},
    });

    if (!userAddress) {
      throw new NotFound();
    }

    return userAddress;
  }

  async myAddress(userId: string, addressId: string) {
    const user = await this.getByIdOrThrow(userId);

    if (user.addresses.length === 0) {
      throw new NotFound();
    }

    const foundAddress = user.addresses.find(
      address => address.id === addressId,
    );

    if (!foundAddress) {
      throw new NotFound();
    }

    return foundAddress;
  }

  async deleteAddress(userId: string, addressId: string) {
    const user = await this.getByIdOrThrow(userId);

    if (!user.addresses) {
      throw new NotFound();
    }

    if (user.addresses.length <= 1) {
      throw new BadRequest();
    }

    await this.databaseService.userAddress.delete({
      where: {
        id: addressId,
      },
    });

    return {
      statusCode: 200,
      message: `Address with id ${addressId} was deleted`,
      success: true,
    };
  }

  async addAddress(userId: string, address: AddAddressBodyType) {
    const user = await this.getByIdOrThrow(userId);

    if (
      user.addresses !== undefined &&
      user.addresses !== null &&
      user.addresses &&
      user.addresses.length >= MAX_USER_ADDRESSES
    ) {
      throw new BadRequest('too_many_addresses');
    }

    const [city, instructions, name, street] = trimStrings(
      address.city,
      address.instructions,
      address.name,
      address.street,
    );

    const updatedUser = await this.databaseService.user.update({
      where: {
        id: userId,
      },
      data: {
        addresses: {
          create: {
            city,
            instructions,
            name,
            street,
            latitude: address.latitude,
            longitude: address.longitude,
            tag: address.tag,
            zip: address.zip,
          },
        },
      },
      include: {
        addresses: true,
      },
    });

    return {
      statusCode: 200,
      id: userId,
      addresses: updatedUser.addresses,
      message: `Address was added`,
      success: true,
    };
  }

  async myCart(userId: string) {
    const user = await this.getByIdOrThrow(userId);

    return {
      id: userId,
      cart: user.cart,
    };
  }

  async myItemCart(userId: string, itemCartId: string) {
    const user = await this.getByIdOrThrow(userId);

    if (user.cart.length === 0) {
      throw new NotFound();
    }

    const foundCart = user.cart.find(cart => cart.id === itemCartId);

    if (!foundCart) {
      throw new NotFound();
    }

    return foundCart;
  }

  async addItemCart(
    userId: string,
    {productId, quantity}: AddItemCartBodyType,
  ) {
    // const user = await this.getByIdOrThrow(userId);
    // const product = await this.productService.getByIdOrThrow(productId);

    const [user, product] = await Promise.all([
      this.getByIdOrThrow(userId),
      this.productService.getByIdOrThrow(productId),
    ]);

    const updatedUser = await this.databaseService.user.update({
      where: {
        id: user.id,
      },
      data: {
        cart: {
          create: {
            product: {
              connect: {
                id: product.id,
              },
            },
            quantity,
          },
        },
      },
      include: {
        cart: true,
      },
    });

    return {
      statusCode: 200,
      id: updatedUser.id,
      cart: updatedUser.cart,
      message: `Item Cart was added`,
      success: true,
    };
  }

  async getUserHasOngoingOrders(userId: string) {
    const user = await this.getByIdOrThrow(userId);

    const ongoingOrdersCount = await this.databaseService.order.count({
      where: {
        user: {
          id: user.id,
        },
        status: {
          notIn: ['CANCELLED', 'DELIVERED'],
        },
      },
    });

    return ongoingOrdersCount > 0;
  }

  async count() {
    return this.databaseService.user.count();
  }

  async getByIdOnlyUser(id: string) {
    return this.databaseService.user.findUnique({where: {id}});
  }

  async getById(id: string) {
    return this.databaseService.user.findUnique({
      where: {
        id,
      },
      include: {
        addresses: true,
        favorites: true,
        cart: true,
        orders: true,
      },
    });
  }

  async getByFacebookUserID(facebookId: string) {
    return this.databaseService.user.findUnique({
      where: {
        facebookId,
      },
      include: {
        addresses: true,
        favorites: true,
        cart: true,
      },
    });
  }

  async getByEmail(email: string) {
    return this.databaseService.user.findFirst({where: {email}});
  }

  async updateNewUser(data: UpdateNewUserBodyType, userId: string) {
    const [email, phone, dni] = trimStrings(data.email, data.phone, data.dni);
    let {
      avatar,
      address: {
        city,
        instructions,
        latitude,
        longitude,
        name,
        street,
        tag,
        zip,
      },
    } = data;
    const user = await this.getByIdOrThrow(userId);
    const isNewUser = this.isNewUser(user);

    if (!isNewUser) {
      return {
        statusCode: 200,
        success: true,
        isNewUser,
      };
    }

    if (avatar && isString(avatar)) {
      let filename = `${user.name.toLocaleLowerCase().replace(' ', '')}-${
        user.id
      }`;
      let cloudinaryResponse = await this.cloudinaryService.upload(
        'users',
        avatar,
        filename,
      );
      avatar = cloudinaryResponse.secure_url;
    }

    const defaultAvatar = this.avatarService.getDefaultAvatar();

    const updatedUser = await this.databaseService.user.update({
      where: {
        id: user.id,
      },
      data: {
        email,
        phone,
        dni,
        avatar: avatar || defaultAvatar,
        addresses: {
          create: {
            city,
            instructions,
            latitude,
            longitude,
            name,
            street,
            tag,
            zip,
          },
        },
      },
      include: {
        addresses: true,
      },
    });

    return {
      statusCode: 200,
      success: true,
      isNewUser: this.isNewUser(updatedUser),
    };
  }

  async deleteItemCart(userId: string, itemCartId: string) {
    const user = await this.getByIdOrThrow(userId);

    if (user.cart.length === 0) {
      throw new NotFound();
    }

    if (!user.cart.find(itemCart => itemCart.id === itemCartId)) {
      throw new BadRequest();
    }

    const updatedCart = await this.databaseService.userCart.delete({
      where: {
        id: itemCartId,
      },
    });

    return {
      statusCode: 200,
      success: true,
      message: `Item Cart with id ${updatedCart.id} was deleted`,
    };
  }

  async editItemCartQuantity(
    userId: string,
    itemCartId: string,
    {quantity}: EditItemCartQuantityBodyType,
  ) {
    const user = await this.getByIdOrThrow(userId);

    if (user.cart.length === 0) {
      throw new NotFound();
    }

    if (!user.cart.find(itemCart => itemCart.id === itemCartId)) {
      throw new BadRequest();
    }

    const updatedCart = await this.databaseService.userCart.update({
      where: {
        id: itemCartId,
      },
      data: {
        quantity,
      },
    });

    return {
      statusCode: 200,
      success: true,
      message: `Item Cart with id ${updatedCart.id} was edited quantity set from ${quantity} to ${updatedCart.quantity}`,
    };
  }

  async deleteCart(userId: string) {
    const user = await this.getByIdOrThrow(userId);

    const updatedCart = await this.databaseService.userCart.deleteMany({
      where: {
        user: {
          id: user.id,
        },
      },
    });

    return {
      statusCode: 200,
      id: user.id,
      success: true,
      message: `${updatedCart.count} items from cart was deleted.`,
    };
  }

  async deleteFavorite(userId: string, favoriteId: string) {
    const user = await this.getByIdOrThrow(userId);

    if (user.favorites.length === 0) {
      throw new NotFound();
    }

    if (!user.favorites.find(favorite => favorite.id === favoriteId)) {
      throw new BadRequest();
    }

    const deletedFavorite = await this.databaseService.userFavorite.delete({
      where: {id: favoriteId},
    });

    return {
      statusCode: 200,
      success: true,
      message: `Favorite with id ${deletedFavorite.id} was deleted`,
    };
  }

  async deleteFavorites(userId: string) {
    await this.getByIdOrThrow(userId);

    await this.databaseService.userFavorite.deleteMany({
      where: {
        user: {
          id: userId,
        },
      },
    });

    return {
      statusCode: 200,
      success: true,
      message: 'Favorites was deleted',
    };
  }

  async myFavorites(userId: string) {
    const user = await this.getByIdOrThrow(userId);

    return {
      id: user.id,
      favorites: user.favorites,
    };
  }

  async myFavorite(userId: string, favoriteId: string) {
    const user = await this.getByIdOrThrow(userId);

    if (user.favorites.length === 0) {
      throw new NotFound();
    }

    const foundFavorite = user.favorites.find(
      favorite => favorite.id === favoriteId,
    );

    if (!foundFavorite) {
      throw new NotFound();
    }

    return foundFavorite;
  }

  isNewUser(user: User & {addresses: UserAddress[]}) {
    return checkIsNewUser(user);
  }

  async updateUserProfile(userId: string, data: UpdateUserProfileBodyType) {
    const [dni, email, phone] = trimStrings(data.dni, data.email, data.phone);
    let {avatar} = data;
    const user = await this.getByIdOnlyUserOrThrow(userId);

    if (
      !avatar &&
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

    if (avatar && isString(avatar)) {
      let filename = `${user.name.toLocaleLowerCase().replace(' ', '')}-${
        user.id
      }`;
      let cloudinaryResponse = await this.cloudinaryService.upload(
        'users',
        avatar,
        filename,
      );
      avatar = cloudinaryResponse.secure_url;
    }

    const defaultAvatar = this.avatarService.getDefaultAvatar();

    await this.databaseService.user.update({
      where: {
        id: user.id,
      },
      data: {
        dni,
        email,
        phone,
        avatar: avatar || defaultAvatar,
      },
    });

    return {
      statusCode: 200,
      success: true,
      modified: true,
    };
  }

  async myOrders(
    userId: string,
    {orderBy = 'desc', skip = 0, take = 10}: GetMyUserOrdersQueryStringType,
  ) {
    const user = await this.getByIdOrThrow(userId);

    const orders = await this.databaseService.order.findMany({
      where: {
        user: {
          id: user.id,
        },
      },
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      orderBy: {
        createdAt: orderBy,
      },
    });

    return orders;
  }

  async createUser({
    name,
    facebookId,
    facebookAccessToken,
    avatar,
  }: Pick<User, 'name' | 'facebookId' | 'facebookAccessToken' | 'avatar'>) {
    return this.databaseService.user.create({
      data: {
        name,
        facebookId,
        facebookAccessToken,
        avatar,
      },
    });
  }

  async updateUserRefreshToken(userId: string, refreshToken: string | null) {
    return this.databaseService.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken,
      },
    });
  }

  async banUser(userId: string, isBanned: boolean, banReason?: string) {
    return this.databaseService.user.update({
      where: {
        id: userId,
      },
      data: {
        isBanned,
        banReason,
      },
    });
  }
}
