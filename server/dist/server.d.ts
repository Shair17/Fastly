/// <reference types="node" />
import 'reflect-metadata';
import { FastifyServerOptions, FastifyInstance, FastifyLoggerInstance } from 'fastify';
import { Server as IServer, IncomingMessage, ServerResponse } from 'http';
declare module 'fastify' {
    interface FastifyInstance {
        config: {
            PORT: string;
            DATABASE_TYPE: string;
            DATABASE_HOST: string;
            DATABASE_PORT: number;
            DATABASE_USERNAME: string;
            DATABASE_PASSWORD: string;
            DATABASE_NAME: string;
        };
    }
}
export default function Server(opts?: FastifyServerOptions): Promise<FastifyInstance<IServer, IncomingMessage, ServerResponse, FastifyLoggerInstance>>;
