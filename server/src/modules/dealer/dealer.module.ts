import {Constructor} from 'fastify-decorators/decorators/helpers/inject-dependencies';
import {DealerController} from './dealer.controller';

export const DealerModule: Constructor<unknown>[] = [DealerController];
