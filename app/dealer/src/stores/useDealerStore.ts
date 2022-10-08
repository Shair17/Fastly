import create from 'zustand';
import {combine} from 'zustand/middleware';
import {storage} from '@fastly/services/storage';
import {http} from '@fastly/services/http';
import {isLoggedIn} from '@fastly/services/refresh-token';
import {isBanned, available, isActive, dealerKey} from '@fastly/constants/auth';
import {Dealer} from '@fastly/interfaces/app';

const getDefaultValues = (): Dealer => {
  const dealer = storage.getString(dealerKey);

  if (dealer) {
    return JSON.parse(dealer);
  }

  return {
    id: '',
    name: '',
    email: '',
    dni: '',
    phone: '',
    address: '',
    avatar: '',
    isBanned,
    banReason: '',
    isActive,
    birthDate: '',
    vehicle: 'NONE',
    available,
    createdAt: '',
    updatedAt: '',
  };
};

export const useDealerStore = create(
  combine(getDefaultValues(), (set, get) => ({
    fetchDealer: async () => {
      const isAuthenticated = isLoggedIn();

      if (!isAuthenticated) {
        set({});
      }

      const response = await http.get<Dealer>('/dealers/me');

      storage.set(dealerKey, JSON.stringify(response.data));

      set({
        ...response.data,
      });
    },
    setDealer: (dealer: Dealer) => {
      storage.set(dealerKey, JSON.stringify(dealer));

      set({
        ...dealer,
      });
    },
  })),
);
