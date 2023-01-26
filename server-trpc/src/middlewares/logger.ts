import {trpc} from '../trpc';
import {upperFirstLetter} from '../utils/string';

const loggerMiddleware = trpc.middleware(
  async ({ctx, meta, next, path, type}) => {
    const start = Date.now();
    const result = await next();
    const durationMs = Date.now() - start;

    if (
      // !!ctx.app.config.NODE_ENV &&
      // ctx.app.config.NODE_ENV !== 'production' &&
      meta?.logger
    ) {
      if (result.ok) {
        ctx.app.log.info(
          `OK request ~ ${upperFirstLetter(
            type,
          )} to path /${path} in +${Math.floor(durationMs)}ms`,
        );
      } else {
        ctx.app.log.error(
          `Non-OK request ~ ${upperFirstLetter(
            type,
          )} to path /${path} in +${Math.floor(durationMs)}ms`,
        );
      }
    }

    return result;
  },
);

export const loggerProcedure = trpc.procedure
  .use(loggerMiddleware)
  .meta({logger: true});
