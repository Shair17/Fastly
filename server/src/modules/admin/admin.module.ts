import {Constructor} from 'fastify-decorators/decorators/helpers/inject-dependencies';
import {AdminController} from './admin.controller';

export const AdminModule: Constructor<unknown>[] = [AdminController];
