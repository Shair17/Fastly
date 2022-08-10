import {Service} from 'fastify-decorators';
import {Unauthorized, InternalServerError} from 'http-errors';
import {ConfigService} from '@fastly/config/config.service';
import {JwtService, JsonWebTokenError, TokenExpiredError} from './jwt.service';
import {
  AuthTokenPayload,
  AuthTokenType,
  ForgotPasswordTokenPayload,
  ForgotPasswordTokenType,
  Tokens,
} from './token.type';

@Service('TokenServiceToken')
export class TokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  generateForgotPasswordToken(
    type: ForgotPasswordTokenType,
    payload: ForgotPasswordTokenPayload,
  ) {
    switch (type) {
      case 'admin':
        return this.jwtService.sign(
          payload,
          this.configService.getOrThrow<string>(
            'JWT_FORGOT_ADMIN_PASSWORD_SECRET',
          ),
          {
            expiresIn: this.configService.getOrThrow<string>(
              'JWT_FORGOT_ADMIN_PASSWORD_SECRET_EXPIRES_IN',
            ),
          },
        );

      case 'customer':
        return this.jwtService.sign(
          payload,
          this.configService.getOrThrow<string>(
            'JWT_FORGOT_CUSTOMER_PASSWORD_SECRET',
          ),
          {
            expiresIn: this.configService.getOrThrow<string>(
              'JWT_FORGOT_CUSTOMER_PASSWORD_SECRET_EXPIRES_IN',
            ),
          },
        );

      case 'dealer':
        return this.jwtService.sign(
          payload,
          this.configService.getOrThrow<string>(
            'JWT_FORGOT_DEALER_PASSWORD_SECRET',
          ),
          {
            expiresIn: this.configService.getOrThrow<string>(
              'JWT_FORGOT_DEALER_PASSWORD_SECRET_EXPIRES_IN',
            ),
          },
        );

      default:
        throw new Error('Invalid token type');
    }
  }

  verifyRefreshToken(type: AuthTokenType, refreshToken: string) {
    switch (type) {
      case 'user':
        try {
          return <AuthTokenPayload>(
            this.jwtService.verify(
              refreshToken,
              this.configService.getOrThrow<string>('JWT_USER_REFRESH_SECRET'),
            )
          );
        } catch (error) {
          if (error instanceof TokenExpiredError) {
            throw new Unauthorized(`token_expired`);
          }

          if (error instanceof JsonWebTokenError) {
            throw new Unauthorized(`invalid_token`);
          }

          throw new InternalServerError();
        }

      case 'admin':
        try {
          return <AuthTokenPayload>(
            this.jwtService.verify(
              refreshToken,
              this.configService.getOrThrow<string>('JWT_ADMIN_REFRESH_SECRET'),
            )
          );
        } catch (error) {
          if (error instanceof TokenExpiredError) {
            throw new Unauthorized(`token_expired`);
          }

          if (error instanceof JsonWebTokenError) {
            throw new Unauthorized(`invalid_token`);
          }

          throw new InternalServerError();
        }

      case 'customer':
        try {
          return <AuthTokenPayload>this.jwtService.verify(
            refreshToken,

            this.configService.getOrThrow<string>(
              'JWT_CUSTOMER_REFRESH_SECRET',
            ),
          );
        } catch (error) {
          if (error instanceof TokenExpiredError) {
            throw new Unauthorized(`token_expired`);
          }

          if (error instanceof JsonWebTokenError) {
            throw new Unauthorized(`invalid_token`);
          }

          throw new InternalServerError();
        }

      case 'dealer':
        try {
          return <AuthTokenPayload>(
            this.jwtService.verify(
              refreshToken,
              this.configService.getOrThrow<string>(
                'JWT_DEALER_REFRESH_SECRET',
              ),
            )
          );
        } catch (error) {
          if (error instanceof TokenExpiredError) {
            throw new Unauthorized(`token_expired`);
          }

          if (error instanceof JsonWebTokenError) {
            throw new Unauthorized(`invalid_token`);
          }

          throw new InternalServerError();
        }

      default:
        throw new Error('Invalid token type');
    }
  }

  verifyForgotPasswordToken(
    type: ForgotPasswordTokenType,
    resetPasswordToken: string,
  ) {
    switch (type) {
      case 'admin':
        try {
          return <ForgotPasswordTokenPayload>(
            this.jwtService.verify(
              resetPasswordToken,
              this.configService.getOrThrow<string>(
                'JWT_FORGOT_ADMIN_PASSWORD_SECRET',
              ),
            )
          );
        } catch (error) {
          if (error instanceof TokenExpiredError) {
            throw new Unauthorized(`token_expired`);
          }

          if (error instanceof JsonWebTokenError) {
            throw new Unauthorized(`invalid_token`);
          }

          throw new InternalServerError();
        }

      case 'customer':
        try {
          return <ForgotPasswordTokenPayload>(
            this.jwtService.verify(
              resetPasswordToken,
              this.configService.getOrThrow<string>(
                'JWT_FORGOT_CUSTOMER_PASSWORD_SECRET',
              ),
            )
          );
        } catch (error) {
          if (error instanceof TokenExpiredError) {
            throw new Unauthorized(`token_expired`);
          }

          if (error instanceof JsonWebTokenError) {
            throw new Unauthorized(`invalid_token`);
          }

          throw new InternalServerError();
        }

      case 'dealer':
        try {
          return <ForgotPasswordTokenPayload>(
            this.jwtService.verify(
              resetPasswordToken,
              this.configService.getOrThrow<string>(
                'JWT_FORGOT_DEALER_PASSWORD_SECRET',
              ),
            )
          );
        } catch (error) {
          if (error instanceof TokenExpiredError) {
            throw new Unauthorized(`token_expired`);
          }

          if (error instanceof JsonWebTokenError) {
            throw new Unauthorized(`invalid_token`);
          }

          throw new InternalServerError();
        }

      default:
        throw new Error('Invalid token type');
    }
  }

  generateAccessToken(type: AuthTokenType, payload: AuthTokenPayload): string {
    switch (type) {
      case 'user':
        return this.jwtService.sign(
          payload,
          this.configService.getOrThrow<string>('JWT_USER_SECRET'),
          {
            expiresIn: this.configService.getOrThrow<string>(
              'JWT_USER_SECRET_EXPIRES_IN',
            ),
          },
        );

      case 'admin':
        return this.jwtService.sign(
          payload,
          this.configService.getOrThrow<string>('JWT_ADMIN_SECRET'),
          {
            expiresIn: this.configService.getOrThrow<string>(
              'JWT_ADMIN_SECRET_EXPIRES_IN',
            ),
          },
        );

      case 'customer':
        return this.jwtService.sign(
          payload,
          this.configService.getOrThrow<string>('JWT_CUSTOMER_SECRET'),
          {
            expiresIn: this.configService.getOrThrow<string>(
              'JWT_CUSTOMER_SECRET_EXPIRES_IN',
            ),
          },
        );

      case 'dealer':
        return this.jwtService.sign(
          payload,
          this.configService.getOrThrow<string>('JWT_DEALER_SECRET'),
          {
            expiresIn: this.configService.getOrThrow<string>(
              'JWT_DEALER_SECRET_EXPIRES_IN',
            ),
          },
        );

      default:
        throw new Error('Invalid token type');
    }
  }

  generateRefreshToken(type: AuthTokenType, payload: AuthTokenPayload): string {
    switch (type) {
      case 'user':
        return this.jwtService.sign(
          payload,
          this.configService.getOrThrow<string>('JWT_USER_REFRESH_SECRET'),
          {
            expiresIn: this.configService.getOrThrow<string>(
              'JWT_USER_REFRESH_SECRET_EXPIRES_IN',
            ),
          },
        );

      case 'admin':
        return this.jwtService.sign(
          payload,
          this.configService.getOrThrow<string>('JWT_ADMIN_REFRESH_SECRET'),
          {
            expiresIn: this.configService.getOrThrow<string>(
              'JWT_ADMIN_REFRESH_SECRET_EXPIRES_IN',
            ),
          },
        );

      case 'customer':
        return this.jwtService.sign(
          payload,
          this.configService.getOrThrow<string>('JWT_CUSTOMER_REFRESH_SECRET'),
          {
            expiresIn: this.configService.getOrThrow<string>(
              'JWT_CUSTOMER_REFRESH_SECRET_EXPIRES_IN',
            ),
          },
        );

      case 'dealer':
        return this.jwtService.sign(
          payload,
          this.configService.getOrThrow<string>('JWT_DEALER_REFRESH_SECRET'),
          {
            expiresIn: this.configService.getOrThrow<string>(
              'JWT_DEALER_REFRESH_SECRET_EXPIRES_IN',
            ),
          },
        );

      default:
        throw new Error('Invalid token type');
    }
  }

  generateTokens(type: AuthTokenType, payload: AuthTokenPayload): Tokens {
    return {
      accessToken: this.generateAccessToken(type, payload),
      refreshToken: this.generateRefreshToken(type, payload),
    };
  }
}
