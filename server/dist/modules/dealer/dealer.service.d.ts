import { DataSourceProvider } from '../../database/DataSourceProvider';
export declare class DealerService {
    private readonly dataSourceProvider;
    private dealerRepository;
    constructor(dataSourceProvider: DataSourceProvider);
    init(): Promise<void>;
}
