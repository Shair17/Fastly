import create from 'zustand';
import { combine } from 'zustand/middleware';
import {
	accessToken,
	refreshToken,
	accessTokenKey,
	refreshTokenKey,
	Tokens,
} from '../constants/auth.constants';

export interface ITokens extends Tokens {}

type AuthTypes = Tokens;

const getDefaultValues = (): AuthTypes => {
	return {
		accessToken: localStorage.getItem(accessTokenKey) ?? accessToken,
		refreshToken: localStorage.getItem(refreshTokenKey) ?? refreshToken,
	};
};

export const useAuthStore = create(
	combine(getDefaultValues(), (set, get) => ({
		setAccessToken: (accessToken: string) => {
			localStorage.setItem(accessTokenKey, accessToken);

			set({
				accessToken,
			});
		},
		setRefreshToken: (refreshToken: string) => {
			localStorage.setItem(refreshTokenKey, refreshToken);

			set({
				refreshToken,
			});
		},
		setTokens: ({ accessToken, refreshToken }: Tokens) => {
			localStorage.setItem(accessTokenKey, accessToken);
			localStorage.setItem(refreshTokenKey, refreshToken);

			set({
				accessToken,
				refreshToken,
			});
		},
		removeTokens: () => {
			localStorage.removeItem(accessTokenKey);
			localStorage.removeItem(refreshTokenKey);

			set({
				accessToken: '',
				refreshToken: '',
			});
		},
	}))
);
