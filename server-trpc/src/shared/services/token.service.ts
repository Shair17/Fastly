import {TRPCError} from '@trpc/server';
import {jwtService, JsonWebTokenError, TokenExpiredError} from './jwt.service';
import {
  Tokens,
  Token,
  Secret,
  DecryptAccessTokenParams,
  DecryptRefreshTokenParams,
  GenerateTokensParams,
  GenerateAccessTokenParams,
  GenerateRefreshTokenParams,
  DecryptForgotPasswordTokenParams,
  GenerateForgotPasswordTokenParams,
} from '../../types';

class TokenService {
  private readonly jwtService = jwtService;

  generateForgotPasswordToken<T extends string | object | Buffer>({
    payload,
    secret,
    expiresIn,
  }: GenerateForgotPasswordTokenParams<T>): Token {
    return this.jwtService.sign(payload, secret, {
      expiresIn,
    });
  }

  verifyAccessToken<T>({accessToken, secret}: DecryptAccessTokenParams): T {
    try {
      return <T>this.jwtService.verify(accessToken, secret);
    } catch (error) {
      console.log(error);
      if (error instanceof TokenExpiredError) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Token Expired',
        });
      }

      if (error instanceof JsonWebTokenError) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid Token',
        });
      }

      throw new TRPCError({
        code: 'UNAUTHORIZED',
      });
    }
  }

  verifyRefreshToken<T>({refreshToken, secret}: DecryptRefreshTokenParams): T {
    try {
      return <T>this.jwtService.verify(refreshToken, secret);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Token Expired',
        });
      }

      if (error instanceof JsonWebTokenError) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid Token',
        });
      }

      throw new TRPCError({
        code: 'UNAUTHORIZED',
      });
    }
  }

  verifyForgotPasswordToken<T>({
    resetPasswordToken,
    secret,
  }: DecryptForgotPasswordTokenParams): T {
    try {
      return <T>this.jwtService.verify(resetPasswordToken, secret);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Token Expired',
        });
      }

      if (error instanceof JsonWebTokenError) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid Token',
        });
      }

      throw new TRPCError({
        code: 'UNAUTHORIZED',
      });
    }
  }

  generateAccessToken<T extends string | object | Buffer>({
    payload,
    secret,
    expiresIn,
  }: GenerateAccessTokenParams<T>): Token {
    return this.jwtService.sign(payload, secret, {
      expiresIn,
    });
  }

  generateRefreshToken<T extends string | object | Buffer>({
    payload,
    secret,
    expiresIn,
  }: GenerateRefreshTokenParams<T>): Token {
    return this.jwtService.sign(payload, secret, {
      expiresIn,
    });
  }

  generateTokens<T extends string | object | Buffer>({
    payload,
    accessToken,
    refreshToken,
  }: GenerateTokensParams<T>): Tokens {
    return {
      accessToken: this.generateAccessToken<T>({
        payload,
        expiresIn: accessToken.expiresIn,
        secret: accessToken.secret,
      }),
      refreshToken: this.generateRefreshToken<T>({
        payload,
        expiresIn: refreshToken.expiresIn,
        secret: refreshToken.secret,
      }),
    };
  }
}

export const tokenService = new TokenService();
