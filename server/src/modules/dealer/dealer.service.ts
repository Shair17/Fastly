import { Service } from 'fastify-decorators';
import { DatabaseService } from '@fastly/database/DatabaseService';
import { Unauthorized, NotFound } from 'http-errors';
import { Dealer, DealerRanking, Order } from '@prisma/client';
import { calcDealerRanking as _calcDealerRanking } from '@fastly/utils/calcDealerRanking';

@Service('DealerServiceToken')
export class DealerService {
  constructor(private readonly databaseService: DatabaseService) {}

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

    const { password, ...restOfDealer } = dealer;

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
    return this.databaseService.admin.findUnique({ where: { email } });
  }

  async getDealerRanking(id: string) {
    const dealer = await this.getByIdOrThrow(id);

    return this.calcDealerRanking(dealer.rankings);
  }

  async getDealerRankings(id: string) {
    const dealer = await this.getByIdOrThrow(id);

    return {
      ranking: this.calcDealerRanking(dealer.rankings),
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

  async calcDealerRanking(rankings: DealerRanking[]) {
    return _calcDealerRanking(rankings);
  }
}
