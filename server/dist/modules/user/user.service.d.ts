import { DataSourceProvider } from '../../database/DataSourceProvider';
export declare class UserService {
    private readonly dataSourceProvider;
    private userRepository;
    constructor(dataSourceProvider: DataSourceProvider);
    init(): Promise<void>;
    getUsers(): Promise<void>;
}
