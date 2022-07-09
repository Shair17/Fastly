import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {ThemeProvider, useTheme} from 'react-native-magnus';
import {NotifierWrapper} from 'react-native-notifier';
import {useMMKVString} from 'react-native-mmkv';
import {NavigationContainer, Theme} from '@react-navigation/native';
import {RootNavigation} from './navigation/RootNavigation';
import Bootsplash from 'react-native-bootsplash';
import {lightTheme, darkTheme, ThemesNames} from './theme';
import {themeStorageKey} from './constants/theme.constants';
import {storage} from './storage';
import {useCheckLocationPermissions} from './hooks/useCheckLocationPermission';

function App() {
  useCheckLocationPermissions();

  const systemTheme = useColorScheme() || 'light';
  const [themeStorage] = useMMKVString(themeStorageKey, storage);
  const {theme: themeState, setTheme} = useTheme();
  const currentTheme = themeStorage || systemTheme;
  const theme = currentTheme === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    if (systemTheme === ThemesNames.lightTheme) {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#fff');
    } else {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('#000');
    }
  }, [systemTheme]);

  useEffect(() => {
    if (theme.name === ThemesNames.lightTheme) {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#fff');
      setTheme(lightTheme);
    } else {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('#000');
      setTheme(darkTheme);
    }
  }, [theme]);

  return (
    <NotifierWrapper>
      <StatusBar
        barStyle={
          theme.name === ThemesNames.lightTheme
            ? 'dark-content'
            : 'light-content'
        }
        backgroundColor={
          theme.name === ThemesNames.lightTheme ? '#fff' : '#000'
        }
      />
      <ThemeProvider theme={theme}>
        <NavigationContainer
          onReady={() => {
            Bootsplash.hide({
              fade: true,
            });
          }}
          theme={{
            dark: themeState.name === ThemesNames.darkTheme,
            colors: {
              primary: 'rgb(254, 85, 74)',
              background: themeState.colors?.body ?? 'rgb(255, 255, 255)',
              card: themeState.colors?.body ?? 'rgb(255, 255, 255)',
              text: themeState.colors?.text ?? 'rgb(0, 0, 0)',
              border: 'rgb(216, 216, 216)',
              notification: 'rgb(255, 59, 48)',
            },
          }}>
          <RootNavigation />
        </NavigationContainer>
      </ThemeProvider>
    </NotifierWrapper>
  );
}

export default App;
