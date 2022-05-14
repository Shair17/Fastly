import { DataSourceProvider } from '../../database/DataSourceProvider';
export declare class StoreService {
    private readonly dataSourceProvider;
    private storeRepository;
    constructor(dataSourceProvider: DataSourceProvider);
    init(): Promise<void>;
}
