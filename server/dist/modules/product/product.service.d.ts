import { DataSourceProvider } from '../../database/DataSourceProvider';
export declare class ProductService {
    private readonly dataSourceProvider;
    private productRepository;
    constructor(dataSourceProvider: DataSourceProvider);
    init(): Promise<void>;
}
