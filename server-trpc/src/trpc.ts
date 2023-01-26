import {initTRPC} from '@trpc/server';
import superjson from 'superjson';
import type {Context} from './context';
import type {Meta} from './meta';

export const trpc = initTRPC.context<Context>().meta<Meta>().create({
  isServer: true,
  transformer: superjson,
  isDev: true,
});
