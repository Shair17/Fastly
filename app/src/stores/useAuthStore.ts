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
} from '../constants/auth.constants';
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
    setAuth: (auth: AuthTypes) => {
      storage.set(accessTokenKey, auth.accessToken);
      storage.set(refreshTokenKey, auth.refreshToken);
      storage.set(isNewUserKey, auth.isNewUser);

      set(auth);
    },
  })),
);
