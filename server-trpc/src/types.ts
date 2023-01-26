import type {FastifyRequest, FastifyReply} from 'fastify';
import {Admin, User, Customer, Dealer} from '@prisma/client';

export type FacebookGraphApiResponse = {
  id: string;
  name: string;
};

export type Scheme = string;
export type Token = string;
export type Secret = string;
export type GenerateAccessTokenParams<T> = {
  payload: T;
  secret: string;
  expiresIn: string;
};
export type GenerateRefreshTokenParams<T> = {
  payload: T;
  secret: string;
  expiresIn: string;
};
export type GenerateTokensParams<T> = {
  payload: T;
  accessToken: {
    secret: string;
    expiresIn: string;
  };
  refreshToken: {
    secret: string;
    expiresIn: string;
  };
};
export type DecryptAccessTokenParams = {
  accessToken: Token;
  secret: Secret;
};
export type DecryptRefreshTokenParams = {
  refreshToken: Token;
  secret: Secret;
};
export type GenerateForgotPasswordTokenParams<T> = {
  payload: T;
  secret: string;
  expiresIn: string;
};
export type DecryptForgotPasswordTokenParams = {
  resetPasswordToken: Token;
  secret: Secret;
};

export type BearerToken = [Scheme, Token];

export type Request = FastifyRequest;

export type Reply = FastifyReply;

export type AdminPayload = Pick<Admin, 'id' | 'email' | 'name'>;
export type UserPayload = Pick<User, 'id' | 'name' | 'facebookId'>;
export type CustomerPayload = Pick<Customer, 'id' | 'email' | 'name'>;
export type DealerPayload = Pick<Dealer, 'id' | 'email' | 'name'>;

export type Tokens = {
  accessToken: Token;
  refreshToken: Token;
};
