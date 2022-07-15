import {storage} from '@fastly/services/storage';
import {themeStorageKey} from '@fastly/constants/theme';

export const getThemeFromStorage = (): string =>
  storage.getString(themeStorageKey) || 'system';
