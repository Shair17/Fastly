import {Constructor} from 'fastify-decorators/decorators/helpers/inject-dependencies';
import {CustomerController} from './customer.controller';

export const CustomerModule: Constructor<unknown>[] = [CustomerController];
