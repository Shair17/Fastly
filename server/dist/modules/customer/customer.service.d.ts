import { DataSourceProvider } from '../../database/DataSourceProvider';
export declare class CustomerService {
    private readonly dataSourceProvider;
    private customerRepository;
    constructor(dataSourceProvider: DataSourceProvider);
    init(): Promise<void>;
}
