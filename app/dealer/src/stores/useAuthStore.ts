import create from 'zustand';
import {combine} from 'zustand/middleware';
import {
  accessToken,
  refreshToken,
  accessTokenKey,
  refreshTokenKey,
  Tokens,
  isActive,
  isActiveKey,
} from '@fastly/constants/auth';
import {http} from '@fastly/services/http';
import {storage} from '@fastly/services/storage';

export interface ITokens extends Tokens {}

type AuthTypes = Tokens & {
  isActive: boolean;
};

const getDefaultValues = (): AuthTypes => {
  return {
    accessToken: storage.getString(accessTokenKey) ?? accessToken,
    refreshToken: storage.getString(refreshTokenKey) ?? refreshToken,
    isActive: storage.getBoolean(isActiveKey) ?? isActive,
  };
};

export const useAuthStore = create(
  combine(getDefaultValues(), (set, get) => ({
    setIsActive: (isActive: boolean) => {
      storage.set(isActiveKey, isActive);

      set({
        isActive,
      });
    },
    setAccessToken: (accessToken: string) => {
      storage.set(accessTokenKey, accessToken);

      set({
        accessToken,
      });
    },
    setRefreshToken: (refreshToken: string) => {
      storage.set(refreshTokenKey, refreshToken);

      set({
        refreshToken,
      });
    },
    setTokens: ({accessToken, refreshToken}: Tokens) => {
      storage.set(accessTokenKey, accessToken);
      storage.set(refreshTokenKey, refreshToken);

      set({
        accessToken,
        refreshToken,
      });
    },
    removeTokens: () => {
      storage.delete(accessTokenKey);
      storage.delete(refreshTokenKey);

      set({
        accessToken: '',
        refreshToken: '',
      });
    },
    logOutFromFastly: async () => {
      await http.post('/auth/dealer/logout');
    },
  })),
);
