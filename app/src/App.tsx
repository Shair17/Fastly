import React, {useEffect} from 'react';
import {
  AppState,
  AppStateStatus,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {ThemeProvider, useTheme} from 'react-native-magnus';
import {useMMKVString} from 'react-native-mmkv';
import {lightTheme, darkTheme, ThemesNames} from './theme';
import {NavigationContainer, Theme} from '@react-navigation/native';
import Bootsplash from 'react-native-bootsplash';
import {RootNavigation} from './navigation/RootNavigation';
import {usePermissionsStore} from './stores/usePermissionsStore';
import {themeStorageKey} from './constants/theme.constants';
import {storage} from './storage';

// TODO: Arreglar el cambio de tema al momento de que el usuario lo cambie desde el dispositivo
function App() {
  const checkLocationPermission = usePermissionsStore(
    s => s.checkLocationPermission,
  );
  const systemTheme = useColorScheme() || 'light';
  const [themeStorage] = useMMKVString(themeStorageKey, storage);
  const {theme: themeState, setTheme} = useTheme();
  const currentTheme = themeStorage || systemTheme;
  const theme = currentTheme === 'light' ? lightTheme : darkTheme;

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
    if (themeStorage !== undefined) return;

    if (systemTheme === ThemesNames.lightTheme) {
      setTheme(lightTheme);
    } else {
      setTheme(darkTheme);
    }
  }, [systemTheme, currentTheme, themeStorage]);

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
    <ThemeProvider theme={theme}>
      <NavigationContainer
        onReady={() => Bootsplash.hide({fade: true})}
        theme={themeNavigation}>
        <RootNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
