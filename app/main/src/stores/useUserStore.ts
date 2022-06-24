import create from 'zustand';
import {combine} from 'zustand/middleware';
import {isNewUser, isBanned, userKey} from '../constants/auth.constants';
import {storage} from '../storage';
import {http} from '../services/http.service';
import {isLoggedIn} from '../services/refresh-token.service';

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

  // const isAuthenticated = isLoggedIn();

  // if (!isAuthenticated) {
  //   return {} as UserType;
  // }

  // const response = await http.get<UserType>('/users/me');

  // console.log(response.data);

  // return response.data;
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
