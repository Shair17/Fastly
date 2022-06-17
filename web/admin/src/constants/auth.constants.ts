import { Admin } from '../interfaces/appInterfaces';

export type Tokens = {
	accessToken: string;
	refreshToken: string;
};

export const accessTokenKey = '@fastly.admin/token';
export const refreshTokenKey = '@fastly.admin/refresh-token';

export const adminKey = '@fastly/admin';

export const admin: Admin = {} as Admin;

export const isBanned = false;

export const accessToken = '';
export const refreshToken = '';
