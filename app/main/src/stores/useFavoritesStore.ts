import create from 'zustand';
import {combine} from 'zustand/middleware';
import {http} from '../services/http.service';
import {isLoggedIn} from '../services/refresh-token.service';

type FavoritesType = {};

const getDefaultValues = (): FavoritesType => {
  return {};
};

export const useFavoritesStore = create(
  combine(getDefaultValues(), (set, get) => ({
    fetchFavorites: async () => {
      const isAuthenticated = isLoggedIn();

      if (!isAuthenticated) {
        set({});
      }

      const response = await http.get<FavoritesType>('/users/me/favorites');

      set({
        ...response.data,
      });
    },
    deleteFavorite: async (id: string) => {},
  })),
);
