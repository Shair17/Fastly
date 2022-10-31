import {useSystemColorScheme} from './useSystemColorScheme';
import {useMMKVString} from 'react-native-mmkv';
import {storage} from '@fastly/services/storage';
import {themeStorageKey} from '@fastly/constants/theme';

type Theme = 'light' | 'dark' | undefined;
type SetTheme = (
  value: Exclude<Theme, undefined> | ((current: Theme) => Theme) | undefined,
) => void;

type ThemeStoragePayload = [Theme, SetTheme];

export const useThemeStorage = () =>
  <ThemeStoragePayload>useMMKVString(themeStorageKey, storage);
