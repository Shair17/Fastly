import { Service, Initializer } from "fastify-decorators";
import { DataSourceProvider } from "../../database/DataSourceProvider";
import { Repository } from "typeorm";
import { Store } from "./store.entity";

@Service()
export class StoreService {
  private storeRepository: Repository<Store>;

  constructor(private readonly dataSourceProvider: DataSourceProvider) {}

  @Initializer([DataSourceProvider])
  async init(): Promise<void> {
    this.storeRepository =
      this.dataSourceProvider.dataSource.getRepository(Store);
  }
}
