import create from 'zustand';
import {combine} from 'zustand/middleware';
import {storage} from '@fastly/services/storage';
import {http} from '@fastly/services/http';
import {isLoggedIn} from '@fastly/services/refresh-token';
import {isNewUser, isBanned, userKey} from '@fastly/constants/auth';

type UserType = {
  id: string;
  facebookId: string;
  name: string;

  isNewUser: boolean;

  dni?: string;
  email?: string;
  phone?: string;
  avatar: string;

  isBanned: boolean;
  banReason?: string;

  createdAt: string;
  updatedAt: string;
};

const getDefaultValues = (): UserType => {
  const user = storage.getString(userKey);

  if (user) {
    return JSON.parse(user);
  }

  return {
    id: '',
    facebookId: '',
    name: '',
    isNewUser,
    dni: '',
    email: '',
    phone: '',
    avatar: '',
    isBanned,
    banReason: '',
    createdAt: '',
    updatedAt: '',
  };
};

export const useUserStore = create(
  combine(getDefaultValues(), (set, get) => ({
    fetchUser: async () => {
      const isAuthenticated = isLoggedIn();

      if (!isAuthenticated) {
        set({});
      }

      const response = await http.get<UserType>('/users/me');

      storage.set(userKey, JSON.stringify(response.data));

      set({
        ...response.data,
      });
    },
    setUser: (user: UserType) => {
      storage.set(userKey, JSON.stringify(user));

      set({
        ...user,
      });
    },
  })),
);
