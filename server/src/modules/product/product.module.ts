import {Constructor} from 'fastify-decorators/decorators/helpers/inject-dependencies';
import {ProductController} from './product.controller';

export const ProductModule: Constructor<unknown>[] = [ProductController];
