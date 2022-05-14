import { DataSourceProvider } from '../../database/DataSourceProvider';
import { User } from './user.entity';
export declare class UserFacade {
    private readonly dataSourceProvider;
    private repository;
    constructor(dataSourceProvider: DataSourceProvider);
    init(): Promise<void>;
    getUsers(): Promise<User[]>;
    getUserBy(id: string): Promise<User | null>;
    saveUser(user: Partial<User>): Promise<User>;
    deleteBy(id: string): Promise<void>;
}
