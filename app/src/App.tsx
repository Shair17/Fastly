import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from 'react-native-magnus';
import {lightTheme, darkTheme, getThemeFromStorage} from './theme';
import Bootsplash from 'react-native-bootsplash';
import {RootNavigation} from './navigation/RootNavigation';

function App() {
  const themeFromStorage = getThemeFromStorage();
  const theme = themeFromStorage === 'light' ? lightTheme : darkTheme;

  if (themeFromStorage === 'light') {
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('#fff');
  } else {
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor('#000');
  }

  return (
    <NavigationContainer onReady={() => Bootsplash.hide({fade: true})}>
      <ThemeProvider theme={theme}>
        <RootNavigation />
      </ThemeProvider>
    </NavigationContainer>
  );
}

export default App;
