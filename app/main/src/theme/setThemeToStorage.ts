import {storage} from '../storage';
import {themeStorageKey} from '../constants/theme.constants';

export const setThemeToStorage = (theme: 'light' | 'dark') => {
  storage.set(themeStorageKey, theme);
};
