import {trpc} from '../../trpc';
import {isString} from '../../utils/string';
import {TRPCError} from '@trpc/server';
import {BEARER_SCHEME_REGEX} from '../../constants/regex';
import {isValidToken, verifyToken} from '../../utils/token';
import {tokenService} from '../../shared/services/token.service';
import {BearerToken} from '../../types';

export const authMiddleware = trpc.middleware(async ({ctx, next}) => {
  const authorization = ctx.req.headers.authorization;

  if (!isString(authorization)) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Token not provided',
    });
  }

  const parts = <BearerToken>authorization.split(' ');
  const [scheme, token] = parts;

  if (!(parts.length === 2 && token.split('.').length === 3)) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Malformed Token',
    });
  }

  if (!BEARER_SCHEME_REGEX.test(scheme)) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Malformed Token',
    });
  }

  if (!isValidToken(token)) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Malformed Token',
    });
  }

  if (!verifyToken(token)) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Invalid Token',
    });
  }

  // getUserFromToken
  // ? Maybe I need to rename this method in tokenService
  const admin = tokenService.verifyAccessToken({
    accessToken: token,
    secret: ctx.app.config.JWT_ADMIN_SECRET,
  });

  return next({
    ctx: {
      ...ctx,
      req: {
        ...ctx.req,
        admin,
      },
    },
  });
});
