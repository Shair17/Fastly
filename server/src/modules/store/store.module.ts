import {Constructor} from 'fastify-decorators/decorators/helpers/inject-dependencies';
import {StoreController} from './store.controller';

export const StoreModule: Constructor<unknown>[] = [StoreController];
