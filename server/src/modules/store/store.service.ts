import {Service} from 'fastify-decorators';
import {NotFound, BadRequest, Unauthorized} from 'http-errors';
import {DatabaseService} from '@fastly/database/DatabaseService';
import {trimStrings} from '@fastly/utils/trimStrings';
import {
  CreateRankingByStoreIdBodyType,
  CreateStoreBodyType,
  EditStoreBodyType,
} from './store.schema';
import {StoreCategory} from '@prisma/client';
import {CustomerService} from '../customer/customer.service';
import {calcStoreRanking} from '@fastly/utils/calcStoreRanking';

@Service('StoreServiceToken')
export class StoreService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly customerService: CustomerService,
  ) {}

  getStores() {
    return this.databaseService.store.findMany();
  }

  getCategories() {
    return {
      categories: Object.values(StoreCategory),
    };
  }

  getById(id: string) {
    return this.databaseService.store.findUnique({
      where: {id},
      include: {
        products: true,
        owner: true,
        rankings: true,
      },
    });
  }

  async getByIdOrThrow(id: string) {
    const store = await this.getById(id);

    if (!store) {
      throw new NotFound(`Store with id ${id} doesn't exists.`);
    }

    return store;
  }

  async getStoresByCategory(category: string) {
    const match = Object.keys(StoreCategory)
      .map(c => c.toLowerCase())
      .includes(category);

    if (!match) {
      throw new BadRequest();
    }

    return this.databaseService.store.findMany({
      where: {
        category:
          StoreCategory[category.toUpperCase() as keyof typeof StoreCategory],
      },
    });
  }

  async createStore(data: CreateStoreBodyType) {
    const [ownerId, address, name] = trimStrings(
      data.owner,
      data.address,
      data.name,
    );
    const {
      category,
      categoryDescription,
      closeTime,
      description,
      logo,
      openTime,
    } = data;
    const owner = await this.customerService.getByIdOrThrow(ownerId);

    const newStore = await this.databaseService.store.create({
      data: {
        address,
        category,
        categoryDescription,
        closeTime,
        openTime,
        description,
        logo,
        name,
        owner: {
          connect: {
            id: owner.id,
          },
        },
      },
    });

    return {
      statusCode: 200,
      store: {
        ...newStore,
      },
      success: true,
    };
  }

  async editStore(id: string, data: EditStoreBodyType) {
    const [ownerId, address, name, logo, description, categoryDescription] =
      trimStrings(
        data.owner,
        data.address,
        data.name,
        data.logo,
        data.description,
        data.categoryDescription,
      );
    const {category, closeTime, openTime} = data;
    const store = await this.getByIdOrThrow(id);
    const owner = await this.customerService.getByIdOrThrow(ownerId);

    const updatedStore = await this.databaseService.store.update({
      where: {
        id: store.id,
      },
      data: {
        name,
        description,
        logo,
        address,
        category,
        categoryDescription,
        openTime,
        closeTime,
        owner: {
          connect: {
            id: owner.id,
          },
        },
      },
    });

    return {
      statusCode: 200,
      store: {
        ...updatedStore,
      },
      success: true,
    };
  }

  async deleteStore(id: string) {
    const store = await this.getByIdOrThrow(id);

    const deletedStore = await this.databaseService.store.delete({
      where: {id: store.id},
    });

    return {
      statusCode: 200,
      success: true,
      message: `Store with id ${deletedStore.id} was deleted.`,
    };
  }

  async getRankingsByStoreId(storeId: string) {
    const store = await this.getByIdOrThrow(storeId);

    return {
      ranking: calcStoreRanking(store.rankings),
      rankings: store.rankings,
    };
  }

  async createRankingByStoreId(
    storeId: string,
    data: CreateRankingByStoreIdBodyType,
  ) {
    const [userId] = trimStrings(data.userId);
    const {value, comment} = data;
    const store = await this.getByIdOrThrow(storeId);
    const user = await this.databaseService.user.findUnique({
      where: {id: userId},
    });

    if (!user) {
      throw new Unauthorized();
    }

    const createdStoreRanking = await this.databaseService.storeRanking.create({
      data: {
        value,
        comment,
        store: {connect: {id: store.id}},
        user: {connect: {id: user.id}},
      },
    });

    return {
      statusCode: 200,
      success: true,
      message: `Store ranking was created`,
      ranking: {
        ...createdStoreRanking,
      },
    };
  }
}
