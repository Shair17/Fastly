import React, {useEffect} from 'react';
import {
  AppState,
  AppStateStatus,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {ThemeProvider, useTheme} from 'react-native-magnus';
import {lightTheme, darkTheme, ThemesNames, getThemeFromStorage} from './theme';
import {NavigationContainer, Theme} from '@react-navigation/native';
import Bootsplash from 'react-native-bootsplash';
import {RootNavigation} from './navigation/RootNavigation';
import {usePermissionsStore} from './stores/usePermissionsStore';

function App() {
  const systemTheme = useColorScheme();
  const {theme: themeState} = useTheme();

  console.log({systemTheme});

  const checkLocationPermission = usePermissionsStore(
    s => s.checkLocationPermission,
  );
  const themeFromStorage = getThemeFromStorage();
  const theme = themeFromStorage === 'light' ? lightTheme : darkTheme;

  const themeNavigation: Theme = {
    dark: themeState.name === ThemesNames.darkTheme,
    colors: {
      primary: 'rgb(254, 85, 74)',
      background: themeState.colors?.body ?? 'rgb(255, 255, 255)',
      card: themeState.colors?.body ?? 'rgb(255, 255, 255)',
      text: themeState.colors?.text ?? 'rgb(0, 0, 0)',
      border: 'rgb(216, 216, 216)',
      notification: 'rgb(255, 59, 48)',
    },
  };

  // if (themeFromStorage === 'light') {
  // StatusBar.setBarStyle('dark-content');
  // StatusBar.setBackgroundColor('#fff');
  // } else {
  // StatusBar.setBarStyle('light-content');
  // StatusBar.setBackgroundColor('#000');
  // }

  useEffect(() => {
    checkLocationPermission();

    const listener = (state: AppStateStatus) => {
      if (state !== 'active') return;

      checkLocationPermission();
    };

    const subscription = AppState.addEventListener('change', listener);

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (theme.name === ThemesNames.lightTheme) {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#fff');
    } else {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('#000');
    }
  }, [themeState.name]);

  return (
    <NavigationContainer
      onReady={() => Bootsplash.hide({fade: true})}
      theme={themeNavigation}>
      <ThemeProvider theme={theme}>
        <RootNavigation />
      </ThemeProvider>
    </NavigationContainer>
  );
}

export default App;
