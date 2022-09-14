import {Service} from 'fastify-decorators';
import {DatabaseService} from '../../database/DatabaseService';
import {Unauthorized} from 'http-errors';
import {Dealer} from '@prisma/client';
import {calcDealerRanking} from '../../utils/calcDealerRanking';
import {
  CreateDealerRankingBodyType,
  GetMyOrdersQueryStringType,
  GetMyRankingsQueryStringType,
} from './dealer.schema';
import {trimStrings} from '../../utils/trimStrings';
import {UserService} from '../user/user.service';
import {GetIsActiveDealerParamsType} from './dealer.schema';

@Service('DealerServiceToken')
export class DealerService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly userService: UserService,
  ) {}

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

  async getByIdOrThrow(id: string) {
    const dealer = await this.getById(id);

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
    return this.databaseService.dealer.findMany();
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
    {skip, take, orderBy = 'desc'}: GetMyOrdersQueryStringType,
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
        product: true,
        productId: false,
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
