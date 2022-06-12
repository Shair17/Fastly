import create from 'zustand';
import {combine} from 'zustand/middleware';
import {isNewUser, isBanned, userKey} from '../constants/auth.constants';
import {storage} from '../storage';

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
    setUser: (user: UserType) => {
      storage.set(userKey, JSON.stringify(user));

      set({
        ...user,
      });
    },
  })),
);
