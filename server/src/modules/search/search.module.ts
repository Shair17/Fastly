import {Constructor} from 'fastify-decorators/decorators/helpers/inject-dependencies';
import {SearchController} from './search.controller';

export const SearchModule: Constructor<unknown>[] = [SearchController];
