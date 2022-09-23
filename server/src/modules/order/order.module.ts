import {Constructor} from 'fastify-decorators/decorators/helpers/inject-dependencies';
import {OrderController} from './order.controller';

export const OrderModule: Constructor<unknown>[] = [OrderController];
