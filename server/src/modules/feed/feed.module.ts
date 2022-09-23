import {Constructor} from 'fastify-decorators/decorators/helpers/inject-dependencies';
import {FeedController} from './feed.controller';

export const FeedModule: Constructor<unknown>[] = [FeedController];
