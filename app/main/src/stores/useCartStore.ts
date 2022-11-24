import create from 'zustand';
import {combine} from 'zustand/middleware';
import {http} from '@fastly/services/http';
import {isLoggedIn} from '@fastly/services/refresh-token';

type CartType = {
  cart: [];
};

const getDefaultValues = (): CartType => {
  return {
    cart: [],
  };
};

export const useCartStore = create(
  combine(getDefaultValues(), (set, get) => ({
    fetchCart: async () => {
      const isAuthenticated = isLoggedIn();

      if (!isAuthenticated) {
        set({
          cart: [],
        });
      }

      const response = await http.get<CartType>('/users/me/cart');

      set({
        cart: response.data.cart,
      });
    },
    addToCart: async (id: string, quantity: number = 1) => {
      const isAuthenticated = isLoggedIn();

      if (!isAuthenticated) {
        set({});
      }

      const response = await http.post('/users/me/cart', {
        productId: id,
        quantity,
      });

      set({
        cart: response.data.cart,
      });
    },
    deleteCart: async (id: string) => {
      const isAuthenticated = isLoggedIn();

      if (!isAuthenticated) {
        set({});
      }

      const response = await http.delete('/users/me/cart');

      set({});
    },
  })),
);
