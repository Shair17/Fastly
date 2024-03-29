import {Service} from 'fastify-decorators';
import {NotFound, BadRequest, Unauthorized} from 'http-errors';
import {DatabaseService} from '../../database/DatabaseService';
import {trimStrings} from '../../utils/trimStrings';
import {
  CreateRankingByStoreIdBodyType,
  CreateStoreBodyType,
  EditStoreBodyType,
} from './store.schema';
import {StoreCategory} from '@prisma/client';
import {CustomerService} from '../customer/customer.service';
import {calcStoreRanking} from '../../utils/calcStoreRanking';
import {CloudinaryService} from '../../shared/services/cloudinary.service';

@Service('StoreServiceToken')
export class StoreService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly databaseService: DatabaseService,
    private readonly customerService: CustomerService,
  ) {}

  async getProductsByStore(storeId: string) {
    const store = await this.getByIdOrThrow(storeId);

    return store.products;
  }

  async getMyStoresForSelect(customerId: string) {
    const customer = await this.customerService.getByIdOnlyCustomerOrThrow(
      customerId,
    );

    const stores = await this.databaseService.customer.findUnique({
      where: {
        id: customer.id,
      },
      select: {
        stores: {
          select: {
            id: true,
            name: true,
            logo: true,
            category: true,
          },
        },
      },
    });

    if (!stores) {
      throw new NotFound();
    }

    const response = stores.stores.map(store => {
      return {
        ...store,
      };
    });

    return response;
  }

  async getMyStoresForCustomer(customerId: string) {
    return this.customerService.getMyStores(customerId);
  }

  count() {
    return this.databaseService.store.count();
  }

  getStores() {
    return this.databaseService.store.findMany({
      include: {
        owner: {
          select: {
            email: true,
          },
        },
      },
    });
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

  async getMyStoreById(customerId: string, storeId: string) {
    const customer = await this.databaseService.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    if (!customer) {
      throw new Unauthorized();
    }

    const store = await this.databaseService.store.findUnique({
      where: {id: storeId},
    });

    if (!store) {
      throw new NotFound(`Store with id ${storeId} not found`);
    }

    if (store.ownerId !== customer.id) {
      throw new Unauthorized();
    }

    return store;
  }

  async getStore(id: string) {
    const store = await this.getByIdOrThrow(id);

    const {owner, ownerId, rankings, ...restOfStore} = store;
    const {password, refreshToken, resetPasswordToken, ...restOfOwner} = owner;

    return {
      ranking: calcStoreRanking(rankings),
      owner: {
        ...restOfOwner,
      },
      ...restOfStore,
    };
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
    const [ownerEmail, address, name] = trimStrings(
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
    const owner = await this.customerService.getByEmail(ownerEmail);

    if (!owner) {
      throw new BadRequest(`Owner with email ${ownerEmail} doesn't exists.`);
    }

    const uploadedLogo = await this.cloudinaryService.upload(
      'stores',
      logo,
      `store-${name}-logo-${Date.now().toString()}`,
    );

    const newStore = await this.databaseService.store.create({
      data: {
        address,
        category,
        categoryDescription,
        closeTime,
        openTime,
        description,
        logo: uploadedLogo.secure_url,
        name,
        owner: {
          connect: {
            id: owner.id,
          },
        },
      },
      include: {
        owner: {
          select: {
            email: true,
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

    const [store, owner] = await Promise.all([
      this.getByIdOrThrow(id),
      this.customerService.getByIdOrThrow(ownerId),
    ]);

    const updatedLogo = await this.cloudinaryService.upload(
      'stores',
      logo,
      `store-${name}-logo-${Date.now().toString()}`,
    );

    const updatedStore = await this.databaseService.store.update({
      where: {
        id: store.id,
      },
      data: {
        name,
        description,
        logo: updatedLogo.secure_url,
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

    const [store, user] = await Promise.all([
      this.getByIdOrThrow(storeId),
      this.databaseService.user.findUnique({
        where: {id: userId},
      }),
    ]);

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
