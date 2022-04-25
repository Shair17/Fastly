import {storage} from '../storage';
import {themeStorageKey} from '../constants/theme.constants';

type ThemeFromStorage = string | 'light' | 'dark';

export const getThemeFromStorage: () => ThemeFromStorage = () =>
  storage.getString(themeStorageKey) || 'light';
