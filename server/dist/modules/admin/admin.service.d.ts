import { DataSourceProvider } from '../../database/DataSourceProvider';
export declare class AdminService {
    private readonly dataSourceProvider;
    private adminRepository;
    constructor(dataSourceProvider: DataSourceProvider);
    init(): Promise<void>;
    getAll(): Promise<number>;
}
