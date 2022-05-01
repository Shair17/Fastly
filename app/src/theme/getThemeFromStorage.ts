import {storage} from '../storage';
import {themeStorageKey} from '../constants/theme.constants';

export const getThemeFromStorage = (): string =>
  storage.getString(themeStorageKey) || 'system';
