import { Service } from 'fastify-decorators';
import { NotFound, BadRequest, Unauthorized } from 'http-errors';
import { DatabaseService } from '@fastly/database/DatabaseService';
import { trimStrings } from '@fastly/utils/trimStrings';
import { CreateStoreBodyType } from './store.schema';
import { AdminService } from '../admin/admin.service';
import { StoreCategory } from '@prisma/client';

@Service('StoreServiceToken')
export class StoreService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly adminService: AdminService,
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
      where: { id },
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
      .map((c) => c.toLowerCase())
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

    const owner = await this.adminService.getByIdOrThrow(ownerId);

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
      store: newStore,
      success: true,
    };
  }
}
