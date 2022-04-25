import {storage} from '../storage';
import {themeStorageKey} from '../constants/theme.constants';

type ThemeFromStorage = () => string;

export const getThemeFromStorage: ThemeFromStorage = () =>
  storage.getString(themeStorageKey) || 'light';
