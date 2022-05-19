import { Service, Initializer } from "fastify-decorators";
import { Order } from "./order.entity";
import { DataSourceProvider } from "../../database/DataSourceProvider";
import { Repository } from "typeorm";

@Service()
export class OrderService {
  private orderRepository: Repository<Order>;

  constructor(private readonly dataSourceProvider: DataSourceProvider) {}

  @Initializer([DataSourceProvider])
  async init(): Promise<void> {
    this.orderRepository =
      this.dataSourceProvider.dataSource.getRepository(Order);
  }
}
