import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useTheme} from 'react-native-magnus';
// import {useAutoSwitchTheme} from './hooks/useAutoSwitchTheme';
import {RootNavigation} from './navigation';
import RNBootSplash from 'react-native-bootsplash';
import {useThemeStorage} from './hooks/useThemeStorage';
import {lightTheme} from './theme/lightTheme';
import {darkTheme} from './theme/darkTheme';
import {useSystemColorScheme} from './hooks/useSystemColorScheme';
import {ThemesNames} from './theme';
import {StatusBar} from 'react-native';

export const Root: React.FC = () => {
  // Check https://github.com/Shair17/Fastly/blob/5d3eddd08393f1354078c66b28b1cd4b925b728e/app/main/src/App.tsx
  const {theme: themeState, setTheme} = useTheme();
  const systemTheme = useSystemColorScheme();
  const [themeStorage] = useThemeStorage();
  const currentTheme = themeStorage || systemTheme;
  const isDarkTheme = currentTheme === 'dark';
  const theme = isDarkTheme ? darkTheme : lightTheme;

  // useEffect(() => {
  //   if (currentTheme === 'dark') {
  //     setTheme(darkTheme);
  //   } else {
  //     setTheme(lightTheme);
  //   }
  // }, [currentTheme]);

  useEffect(() => {
    if (themeStorage === 'dark') {
      setTheme(darkTheme);
    } else if (themeStorage === 'light') {
      setTheme(lightTheme);
    } else {
      const currentTheme = themeStorage || systemTheme;

      setTheme(currentTheme === 'dark' ? darkTheme : lightTheme);
    }
  }, [themeStorage]);

  useEffect(() => {
    if (themeState.name === ThemesNames.darkTheme) {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('#000');
    } else {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#fff');
    }
  }, [themeState]);

  return (
    <NavigationContainer
      onReady={() => RNBootSplash.hide({fade: true})}
      theme={{
        dark: isDarkTheme,
        colors: {
          primary: 'rgb(254, 85, 74)',
          background: theme.colors?.body ?? 'rgb(255, 255, 255)',
          card: theme.colors?.body ?? 'rgb(255, 255, 255)',
          text: theme.colors?.text ?? 'rgb(0, 0, 0)',
          border: 'rgb(216, 216, 216)',
          notification: 'rgb(255, 59, 48)',
        },
      }}>
      <RootNavigation />
    </NavigationContainer>
  );
};
