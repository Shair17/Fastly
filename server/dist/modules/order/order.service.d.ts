import { DataSourceProvider } from '../../database/DataSourceProvider';
export declare class OrderService {
    private readonly dataSourceProvider;
    private orderRepository;
    constructor(dataSourceProvider: DataSourceProvider);
    init(): Promise<void>;
}
