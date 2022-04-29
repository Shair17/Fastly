import create from 'zustand';
import {combine} from 'zustand/middleware';
import {
  accessToken,
  refreshToken,
  isNewUser,
  user,
  isAuthenticated,
  isNewUserKey,
  accessTokenKey,
  refreshTokenKey,
} from '../constants/authentication.constants';
import {storage} from '../storage';

type AuthTypes = {
  isAuthenticated: boolean;
  isNewUser: boolean;
  accessToken: string;
  refreshToken: string;
  user: {};
};

const getDefaultValues = (): AuthTypes => {
  return {
    isAuthenticated,
    isNewUser,
    accessToken: storage.getString(accessTokenKey) ?? accessToken,
    refreshToken: storage.getString(refreshTokenKey) ?? refreshToken,
    user,
  };
};

export const useAuthStore = create(
  combine(getDefaultValues(), set => ({
    // increase: (by: number) => set(state => ({bears: state.bears + by})),
    setAuth: (authentication: AuthTypes) => {
      storage.set(accessTokenKey, authentication.accessToken);
      storage.set(refreshTokenKey, authentication.refreshToken);
      storage.set(isNewUserKey, authentication.isNewUser);

      set(authentication);
    },
  })),
);
