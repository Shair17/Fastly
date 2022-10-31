import {Service} from 'fastify-decorators';
import {DatabaseService} from '../../database/DatabaseService';
import {Store, Product} from '@prisma/client';
import {
  GetStoresByCategoryQueryStringType,
  GetFeedStoresQueryStringType,
  GetFeedProductsQueryStringType,
} from './feed.schema';
import {randomPick} from '../../utils/randomPick';
import {calcStoreRanking} from '../../utils/calcStoreRanking';
import {NotFound} from 'http-errors';

// Carousel
type Image = string;
type AdType = 'link' | 'product' | 'store' | 'category';
export type Carousel = {
  image: Image;
  type: AdType;
  metadata: {
    url?: string | null;
    entityId?: string | null;
    message?: string | null;
  };
};

type Recommended = Product;

type FeedStores = Store;

type ProductsJustAdded = Product;

type StoresJustAdded = Store;

type FeedProducts = Product;

type Response = {
  carousel: Carousel[];
  recommended: Recommended[];
  productsJustAdded: ProductsJustAdded[];
  storesJustAdded: StoresJustAdded[];
  stores: FeedStores[];
  products: FeedProducts[];
};

@Service('FeedServiceToken')
export class FeedService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getStore(id: string) {
    const store = await this.databaseService.store.findUnique({
      where: {id},
      include: {
        rankings: true,
      },
    });

    if (!store) {
      throw new NotFound(`Store with id ${id} not found`);
    }

    const {rankings, ...restOfStore} = store;

    return {
      ranking: calcStoreRanking(rankings),
      ...restOfStore,
    };
  }

  async getProductsForFeed({
    orderBy = 'desc',
    skip = 0,
    take = 10,
  }: GetFeedProductsQueryStringType) {
    return this.databaseService.product.findMany({
      take: Number(take),
      skip: Number(skip),
      orderBy: {
        createdAt: orderBy,
      },
    });
  }

  async getStoresForFeed({
    orderBy = 'desc',
    skip = 0,
    take = 10,
  }: GetFeedStoresQueryStringType) {
    return this.databaseService.store.findMany({
      take: Number(take),
      skip: Number(skip),
      orderBy: {
        createdAt: orderBy,
      },
    });
  }

  async getStoresByCategory({
    category,
    orderBy = 'desc',
    skip = 0,
    take = 10,
  }: GetStoresByCategoryQueryStringType) {
    const _stores = await this.databaseService.store.findMany({
      where: {
        category,
      },
      take: Number(take),
      skip: Number(skip),
      orderBy: {
        createdAt: orderBy,
      },
      include: {
        rankings: true,
      },
    });

    const stores = _stores.map(store => {
      const {rankings, ...restOfStore} = store;
      return {
        ranking: {
          value: calcStoreRanking(rankings),
          size: rankings.length,
        },
        ...restOfStore,
      };
    });

    return stores;
  }

  private getCarousel(): Carousel[] {
    return [
      {
        image: 'https://i.imgur.com/tY7C92E.jpg',
        type: 'link',
        metadata: {
          entityId: null,
          url: 'https://fastly.delivery',
          message: 'Visita la página oficial de Fastly!',
        },
      },
      {
        image: 'https://i.imgur.com/7gPXgc9.jpg',
        type: 'link',
        metadata: {
          entityId: null,
          url: 'https://shair.dev',
          message: 'Visita la página oficial de Shair!',
        },
      },
      {
        image: 'https://i.imgur.com/7qCeIpT.jpg',
        type: 'store',
        metadata: {
          entityId: '321456789',
          url: null,
          message: 'Aprovecha esta oferta en Monapizzas!',
        },
      },
      {
        image: 'https://i.imgur.com/d748QAb.jpg',
        type: 'product',
        metadata: {
          entityId: '7457684734adsdas',
          url: null,
          message: 'Aprovecha esta oferta!',
        },
      },
      {
        image: 'https://i.imgur.com/iZooGpd.jpg',
        type: 'link',
        metadata: {
          entityId: null,
          url: 'https://shair.dev/instagram',
          message: 'Visita instagram oficial de Shair!',
        },
      },
    ];
  }

  // ? productos recomendados, poner 10 inicialmente, 5 obtenidos de db (más comprados) y 5 puestos por nosotros en código, no es lo más optimo pero bueno :/
  private async getRecommended() {
    return this.databaseService.product.findMany({
      take: 10,
      orderBy: {
        createdAt: randomPick(['asc', 'desc']) as any,
      },
    });
  }

  private async getProductsJustAdded() {
    return this.databaseService.product.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  private async getStoresJustAdded() {
    return this.databaseService.store.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // ? stores, poner 10 stores randoms.
  private async getStores() {
    return this.databaseService.store.findMany({
      take: 10,
    });
  }

  // ? products, poner 10 productos randoms
  private async getProducts() {
    return this.databaseService.product.findMany({
      take: 10,
    });
  }

  async getFeed(): Promise<Response> {
    return {
      carousel: this.getCarousel(),
      recommended: await this.getRecommended(),
      productsJustAdded: await this.getProductsJustAdded(),
      storesJustAdded: await this.getStoresJustAdded(),
      stores: await this.getStores(),
      products: await this.getProducts(),
    };
  }
}
