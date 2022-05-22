import create from 'zustand';
import {combine} from 'zustand/middleware';
import {
  accessToken,
  refreshToken,
  isNewUser,
  user,
  isNewUserKey,
  accessTokenKey,
  refreshTokenKey,
  Tokens,
} from '../constants/auth.constants';
import {storage} from '../storage';

type AuthTypes = Tokens & {
  isNewUser: boolean;
  user: {};
};

const getDefaultValues = (): AuthTypes => {
  return {
    isNewUser: storage.getBoolean(isNewUserKey) ?? isNewUser,
    accessToken: storage.getString(accessTokenKey) ?? accessToken,
    refreshToken: storage.getString(refreshTokenKey) ?? refreshToken,
    user,
  };
};

export const useAuthStore = create(
  combine(getDefaultValues(), (set, get) => ({
    // increase: (by: number) => set(state => ({bears: state.bears + by})),
    setUser: (user: {}) => {
      // ...
    },
    setIsNewUser: (isNewUser: boolean) => {
      storage.set(isNewUserKey, isNewUser);

      set({
        isNewUser,
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
  })),
);
