import create from 'zustand';
import {combine} from 'zustand/middleware';
import {http} from '@fastly/services/http';
import {isLoggedIn} from '@fastly/services/refresh-token';

type CartType = {};

const getDefaultValues = (): CartType => {
  return {};
};

export const useCartStore = create(
  combine(getDefaultValues(), (set, get) => ({
    fetchCart: async () => {
      const isAuthenticated = isLoggedIn();

      if (!isAuthenticated) {
        set({});
      }

      const response = await http.get<CartType>('/users/me/cart');

      set({
        ...response.data,
      });
    },
    deleteCart: async (id: string) => {
      // ...get().admins.filter((admin) => admin.id !== id)
    },
  })),
);
