import jwt from 'jsonwebtoken';
import {Token} from '../../types';

export class JsonWebTokenError extends jwt.JsonWebTokenError {}
export class NotBeforeError extends jwt.NotBeforeError {}
export class TokenExpiredError extends jwt.TokenExpiredError {}

class JwtService {
  private readonly jwt = jwt;

  sign(
    payload: string | object | Buffer,
    secretOrPrivateKey: jwt.Secret,
    options?: jwt.SignOptions,
  ): Token {
    return this.jwt.sign(payload, secretOrPrivateKey, options);
  }

  verify(
    token: Token,
    secretOrPublicKey: jwt.Secret,
    options?: jwt.VerifyOptions & {complete: true},
  ) {
    return this.jwt.verify(token, secretOrPublicKey, options);
  }

  decode(token: Token, options?: jwt.DecodeOptions & {complete: true}) {
    return this.jwt.decode(token, options);
  }
}

export const jwtService = new JwtService();
