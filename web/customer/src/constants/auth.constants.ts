import {Customer} from '@fastly/interfaces/appInterfaces';

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export const accessTokenKey = '@fastly.customer/token';
export const refreshTokenKey = '@fastly.customer/refresh-token';

export const customerKey = '@fastly/customer';

export const customer: Customer = {} as Customer;

export const isBanned = false;

export const accessToken = '';
export const refreshToken = '';
