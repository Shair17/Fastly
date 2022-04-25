import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider, Text, Div, useTheme, Toggle} from 'react-native-magnus';
import {
  lightTheme,
  darkTheme,
  getThemeFromStorage,
  setThemeToStorage,
} from './theme';
import Bootsplash from 'react-native-bootsplash';

const ThemeSwitcher = () => {
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
        <Div bg="body" flex={1} px="lg">
          <Text mt="2xl" pt="xl" fontSize="5xl" color="text" fontWeight="bold">
            Settings
          </Text>
          <Div row mt="md">
            <Div flex={1}>
              <Text color="text">Dark Theme</Text>
            </Div>
            <Div>
              <ThemeSwitcher />
            </Div>
          </Div>
        </Div>
      </ThemeProvider>
    </NavigationContainer>
  );
}

export default App;
