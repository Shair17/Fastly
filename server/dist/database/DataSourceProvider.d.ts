import { DataSource } from 'typeorm';
export declare class DataSourceProvider {
    private readonly fastify;
    get dataSource(): DataSource;
    init(): Promise<void>;
    destroy(): Promise<void>;
}
