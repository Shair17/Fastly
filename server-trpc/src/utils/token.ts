import {TRPCError} from '@trpc/server';
import {JwtPayload} from 'jsonwebtoken';
import {JWT_REGEX} from '../constants/regex';
import {jwtService} from '../shared/services/jwt.service';
import {Token} from '../types';

export const isValidToken = (token: Token): boolean =>
  token.split('.').length === 3 && JWT_REGEX.test(token);

export const verifyToken = (token: Token): boolean => {
  if (!token) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Invalid Token',
    });
  }

  const decoded = <JwtPayload>jwtService.decode(token);

  if (!decoded) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Invalid Token',
    });
  }

  if (new Date(decoded.exp! * 1000) < new Date()) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Expired Token',
    });
  }

  return true;
};
