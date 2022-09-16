import {useEffect} from 'react';
import {useTheme} from 'react-native-magnus';
import {lightTheme, darkTheme} from '@fastly/theme';
import {useSystemColorScheme} from './useSystemColorScheme';

// TODO: Mejorar este hook
export const useAutoSwitchTheme = () => {
  const systemTheme = useSystemColorScheme();
  const isDarkTheme = systemTheme === 'dark';
  const theme = isDarkTheme ? darkTheme : lightTheme;
  const {setTheme} = useTheme();

  useEffect(() => {
    if (isDarkTheme) {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  }, [isDarkTheme]);

  return {
    theme,
    isDarkTheme,
  };
};
