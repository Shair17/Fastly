import {trpc} from '../trpc';
import {authRoute} from './auth.route';

export const appRouter = trpc.mergeRouters(authRoute);

export type AppRouter = typeof appRouter;
