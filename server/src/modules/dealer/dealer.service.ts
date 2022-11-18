import {Service} from 'fastify-decorators';
import {DatabaseService} from '../../database/DatabaseService';
import {Unauthorized, BadRequest} from 'http-errors';
import {Dealer} from '@prisma/client';
import {calcDealerRanking} from '../../utils/calcDealerRanking';
import {
  CreateDealerBodyType,
  CreateDealerRankingBodyType,
  EditDealerBodyType,
  GetMyOrdersQueryStringType,
  GetMyRankingsQueryStringType,
  UpdateDealerProfileBodyType,
} from './dealer.schema';
import {trimStrings} from '../../utils/trimStrings';
import {UserService} from '../user/user.service';
import {GetIsActiveDealerParamsType} from './dealer.schema';
import {SHAIR_EMAIL} from '../../constants/app';
import {AvatarService} from '../../shared/services/avatar.service';
import {PasswordService} from '../../shared/services/password.service';
import {CloudinaryService} from '../../shared/services/cloudinary.service';
import {isString} from '../../utils';

@Service('DealerServiceToken')
export class DealerService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly avatarService: AvatarService,
    private readonly passwordService: PasswordService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly userService: UserService,
  ) {}

  async updateDealerProfile(
    dealerId: string,
    data: UpdateDealerProfileBodyType,
  ) {
    const [address, email, name, phone] = trimStrings(
      data.address,
      data.email,
      data.name,
      data.phone,
    );
    let {avatar} = data;
    const dealer = await this.getByIdOnlyDealerOrThrow(dealerId);

    if (
      !avatar &&
      dealer.avatar === avatar &&
      dealer.address === address &&
      dealer.email === email &&
      dealer.name === name &&
      dealer.phone === phone &&
      dealer.vehicle === data.vehicle
    ) {
      return {
        statusCode: 200,
        success: true,
        modified: false,
      };
    }

    if (avatar && isString(avatar)) {
      let filename = `${dealer.name.toLocaleLowerCase().replace(' ', '')}-${
        dealer.id
      }`;
      let cloudinaryResponse = await this.cloudinaryService.upload(
        'dealers',
        avatar,
        filename,
      );
      avatar = cloudinaryResponse.secure_url;
    }

    const defaultAvatar = this.avatarService.getDefaultAvatar();

    await this.databaseService.dealer.update({
      where: {
        id: dealer.id,
      },
      data: {
        name,
        address,
        email,
        phone,
        vehicle: data.vehicle,
        avatar: avatar || defaultAvatar,
      },
    });

    return {
      statusCode: 200,
      success: true,
      modified: true,
    };
  }

  async getIsActive({id: dealerId}: GetIsActiveDealerParamsType) {
    const dealer = await this.getByIdOrThrow(dealerId);

    return {
      id: dealer.id,
      isActive: dealer.isActive,
    };
  }

  count() {
    return this.databaseService.dealer.count();
  }

  async createDealer(data: CreateDealerBodyType) {
    const [address, dni, email, name, phone, birthDate] = trimStrings(
      data.address,
      data.dni,
      data.email,
      data.name,
      data.phone,
      data.birthDate,
    );
    let {avatar} = data;

    const foundDealer = await this.getByEmail(email);

    if (foundDealer) {
      throw new BadRequest('account_taken');
    }

    if (!this.passwordService.isValidPassword(data.password)) {
      throw new BadRequest('invalid_password');
    }

    const hashedPassword = await this.passwordService.hash(data.password);

    if (avatar && isString(avatar)) {
      let filename = `${name
        .toLocaleLowerCase()
        .replace(' ', '')}-${Date.now().toString()}`;
      let cloudinaryResponse = await this.cloudinaryService.upload(
        'dealers',
        avatar,
        filename,
      );
      avatar = cloudinaryResponse.secure_url;
    }

    const defaultAvatar = this.avatarService.getDefaultAvatar();

    return this.databaseService.dealer.create({
      data: {
        address,
        avatar: avatar || defaultAvatar,
        birthDate: new Date(birthDate),
        dni,
        email,
        name,
        phone,
        password: hashedPassword,
        isActive: false,
        vehicle: data.vehicle,
        available: false,
        isBanned: false,
      },
    });
  }

  async editDealer(adminId: string, data: EditDealerBodyType) {
    const [address, dni, email, name, phone, birthDate] = trimStrings(
      data.address,
      data.dni,
      data.email,
      data.name,
      data.phone,
      data.birthDate,
    );
    let {avatar} = data;

    const foundDealer = await this.getByIdOrThrow(adminId);

    if (!this.passwordService.isValidPassword(data.password)) {
      throw new BadRequest('invalid_password');
    }

    const hashedPassword = await this.passwordService.hash(data.password);

    if (avatar && isString(avatar)) {
      let filename = `${foundDealer.name
        .toLocaleLowerCase()
        .replace(' ', '')}-${foundDealer.id}`;
      let cloudinaryResponse = await this.cloudinaryService.upload(
        'dealers',
        avatar,
        filename,
      );
      avatar = cloudinaryResponse.secure_url;
    }

    const defaultAvatar = this.avatarService.getDefaultAvatar();

    return this.databaseService.dealer.update({
      where: {
        id: foundDealer.id,
      },
      data: {
        address,
        phone,
        name,
        dni,
        email,
        password: hashedPassword,
        avatar: avatar || defaultAvatar,
        isActive: data.isActive,
        birthDate: new Date(birthDate),
        vehicle: data.vehicle,
        available: data.available,
        banReason: data.banReason,
        isBanned: data.isBanned,
      },
    });
  }

  async deleteDealer(id: string) {
    const dealer = await this.getById(id);

    if (!dealer) {
      throw new Unauthorized();
    }

    if (dealer.email === SHAIR_EMAIL) {
      // throw new BadRequest('lol, no puedes eliminar a Shair jajajsda');
      throw new BadRequest('Cooñooooo, no puedes eliminar a tu papi 😡');
    }

    return this.databaseService.dealer.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
  }

  async getByIdOrThrow(id: string) {
    const dealer = await this.getById(id);

    if (!dealer) {
      throw new Unauthorized();
    }

    return dealer;
  }

  async getByIdOnlyDealerOrThrow(id: string) {
    const dealer = await this.databaseService.dealer.findUnique({
      where: {
        id,
      },
    });

    if (!dealer) {
      throw new Unauthorized();
    }

    return dealer;
  }

  async me(dealerId: string) {
    const dealer = await this.getById(dealerId);

    if (!dealer) {
      throw new Unauthorized();
    }

    const {
      password,
      resetPasswordToken,
      refreshToken,
      rankings,
      orders,
      ...restOfDealer
    } = dealer;

    return restOfDealer;
  }

  async create({
    address,
    avatar,
    birthDate,
    dni,
    name,
    email,
    phone,
    password,
    isActive,
  }: Pick<
    Dealer,
    | 'phone'
    | 'password'
    | 'isActive'
    | 'email'
    | 'address'
    | 'avatar'
    | 'birthDate'
    | 'dni'
    | 'name'
  >) {
    return this.databaseService.dealer.create({
      data: {
        address,
        avatar,
        birthDate: new Date(birthDate),
        dni,
        email,
        name,
        phone,
        password,
        isActive,
      },
    });
  }

  async getDealers() {
    const dealers = await this.databaseService.dealer.findMany({
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
        refreshToken: false,
        resetPasswordToken: false,
        available: true,
        orders: false,
        rankings: true,
        vehicle: true,
      },
    });

    const response = dealers.map(({rankings, ...dealer}) => {
      return {
        ...dealer,
        ranking: calcDealerRanking(rankings),
      };
    });

    return response;
  }

  /**
   * Uso solo para sockets
   */
  async setDealerAvailable(dealerId: string, isAvailable: boolean) {
    if (!dealerId) return;

    const dealer = await this.databaseService.dealer.findUnique({
      where: {id: dealerId},
    });

    if (!dealer) return;

    if (dealer.isActive && !dealer.isBanned) {
      await this.databaseService.dealer.update({
        where: {
          id: dealer.id,
        },
        data: {
          available: isAvailable,
        },
      });
    }
  }

  async getByIdOnlyDealer(id: string) {
    return this.databaseService.dealer.findUnique({
      where: {
        id,
      },
    });
  }

  getById(id: string) {
    return this.databaseService.dealer.findUnique({
      where: {
        id,
      },
      include: {
        orders: true,
        rankings: true,
      },
    });
  }

  getByEmail(email: string) {
    return this.databaseService.dealer.findUnique({where: {email}});
  }

  async createDealerRanking(
    dealerId: string,
    data: CreateDealerRankingBodyType,
  ) {
    const [userId] = trimStrings(data.userId);
    const {value, comment} = data;

    const [dealer, user] = await Promise.all([
      this.getByIdOrThrow(dealerId),
      this.userService.getByIdOrThrow(userId),
    ]);

    // TODO: probar si esto funciona bien
    // solo se podrá agregar un ranking si existe una orden, usuario, dealer creados.
    const orderFound = await this.databaseService.order.findFirst({
      where: {
        user: {
          id: user.id,
        },
        dealer: {
          id: dealer.id,
        },
        status: 'DELIVERED',
      },
    });

    if (!orderFound) {
      throw new Unauthorized();
    }

    const createdDealerRanking =
      await this.databaseService.dealerRanking.create({
        data: {
          value,
          comment,
          dealer: {
            connect: {
              id: dealer.id,
            },
          },
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });

    return {
      statusCode: 200,
      success: true,
      message: 'Dealer ranking was created',
      ranking: {
        ...createdDealerRanking,
      },
    };
  }

  async getDealerRanking(id: string) {
    const dealer = await this.getByIdOrThrow(id);

    return calcDealerRanking(dealer.rankings);
  }

  async getDealerRankings(id: string) {
    const dealer = await this.getByIdOrThrow(id);

    return {
      ranking: calcDealerRanking(dealer.rankings),
      rankings: dealer.rankings,
    };
  }

  async getDealerIsAvailable(dealerId: string) {
    const dealer = await this.getByIdOrThrow(dealerId);

    return dealer.available && dealer.isActive && !dealer.isBanned;
  }

  async banDealer(dealerId: string, banReason?: string) {
    return this.databaseService.dealer.update({
      where: {
        id: dealerId,
      },
      data: {
        isBanned: true,
        banReason,
      },
    });
  }

  async getAvailableDealers() {
    return this.databaseService.dealer.findMany({
      where: {
        isActive: true,
        available: true,
        isBanned: false,
      },
    });
  }

  async getAvailableDealersCount() {
    return this.databaseService.dealer.count({
      where: {
        isActive: true,
        available: true,
        isBanned: false,
      },
    });
  }

  async getActiveDealers() {
    return this.databaseService.dealer.findMany({
      where: {
        isActive: true,
        isBanned: false,
      },
    });
  }

  async updateDealerRefreshToken(
    dealerId: string,
    refreshToken: string | null,
  ) {
    return this.databaseService.dealer.update({
      where: {
        id: dealerId,
      },
      data: {
        refreshToken,
      },
    });
  }

  async updateDealerResetPasswordToken(
    dealerId: string,
    resetPasswordToken: string | null,
  ) {
    return this.databaseService.dealer.update({
      where: {
        id: dealerId,
      },
      data: {
        resetPasswordToken,
      },
    });
  }

  async updateDealerPassword(dealerId: string, password: string) {
    return this.databaseService.dealer.update({
      where: {
        id: dealerId,
      },
      data: {
        password,
      },
    });
  }

  async getMyOrdersCount(dealerId: string) {
    const dealer = await this.getByIdOrThrow(dealerId);

    const ordersCount = await this.databaseService.order.count({
      where: {
        dealer: {
          id: dealer.id,
        },
      },
    });

    return ordersCount;
  }

  async getMyOrders(
    dealerId: string,
    {skip = 10, take = 10, orderBy = 'desc'}: GetMyOrdersQueryStringType,
  ) {
    const dealer = await this.getByIdOrThrow(dealerId);
    const orders = await this.databaseService.order.findMany({
      where: {
        dealer: {
          id: dealer.id,
        },
      },
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      orderBy: {
        createdAt: orderBy,
      },
      select: {
        id: true,
        address: true,
        arrivalTime: true,
        createdAt: true,
        updatedAt: true,
        dealer: false,
        dealerId: false,
        deliveryPrice: true,
        message: true,
        products: true,
        quantity: true,
        status: true,
        userAddressId: false,
        user: false,
        userId: false,
      },
    });

    return orders;
  }

  async getMyRanking(dealerId: string) {
    const dealer = await this.getByIdOrThrow(dealerId);

    return calcDealerRanking(dealer.rankings);
  }

  async getMyRankings(
    dealerId: string,
    {orderBy = 'desc', skip = 0, take = 10}: GetMyRankingsQueryStringType,
  ) {
    const dealer = await this.getByIdOrThrow(dealerId);

    const rankings = await this.databaseService.dealerRanking.findMany({
      where: {
        dealer: {
          id: dealer.id,
        },
      },
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      orderBy: {
        createdAt: orderBy,
      },
      select: {
        comment: true,
        createdAt: true,
        dealer: false,
        dealerId: false,
        id: true,
        updatedAt: true,
        user: false,
        userId: false,
        value: true,
      },
    });

    return rankings;
  }
}
