import create from 'zustand';
import {combine} from 'zustand/middleware';
import {
  recentSearchesKey,
  defaultRecentSearches,
} from '../constants/search.constants';
import {storage} from '../storage';

type RecentSearchesType = {
  searches: string[];
};

const getDefaultValues = (): RecentSearchesType => {
  const recentSearches = storage.getString(recentSearchesKey);

  if (recentSearches) {
    return {
      searches: JSON.parse(recentSearches),
    };
  }

  return {
    searches: defaultRecentSearches,
  };
};

export const useRecentSearchesStore = create(
  combine(getDefaultValues(), (set, get) => ({
    addRecentSearch: (search: string) => {
      const searches = get().searches;

      if (searches.includes(search)) {
        return;
      }

      searches.push(search);

      storage.set(recentSearchesKey, JSON.stringify(searches));

      set({
        searches,
      });
    },
    removeRecentSearches: () => {
      storage.delete(recentSearchesKey);

      set({
        searches: [],
      });
    },
  })),
);
