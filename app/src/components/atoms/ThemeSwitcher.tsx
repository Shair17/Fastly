import React from 'react';
import {StatusBar} from 'react-native';
import {useTheme, Toggle} from 'react-native-magnus';
import {lightTheme, darkTheme, setThemeToStorage} from '../../theme';

export const ThemeSwitcher = () => {
  const {theme, setTheme} = useTheme();

  const onToggle = () => {
    if (theme.name === 'dark') {
      setTheme(lightTheme);
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#fff');
      setThemeToStorage('light');
    } else {
      setTheme(darkTheme);
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('#000');
      setThemeToStorage('dark');
    }
  };

  return <Toggle on={theme.name === 'dark'} onPress={onToggle} />;
};
