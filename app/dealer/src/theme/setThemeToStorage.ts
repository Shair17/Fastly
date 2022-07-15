import {storage} from '@fastly/services/storage';
import {themeStorageKey} from '@fastly/constants/theme';

export const setThemeToStorage = (theme: 'light' | 'dark') => {
  storage.set(themeStorageKey, theme);
};
