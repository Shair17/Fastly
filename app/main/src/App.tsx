import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from 'react-native-magnus';
import {NotifierWrapper} from 'react-native-notifier';
import RNBootSplash from 'react-native-bootsplash';
import {RootNavigation} from '@fastly/navigation';
import {useCheckLocationPermissions} from '@fastly/hooks/useCheckLocationPermission';
import {useAutoSwitchTheme} from '@fastly/hooks/useAutoSwitchTheme';

function App() {
  useCheckLocationPermissions();
  const {theme, isDarkTheme} = useAutoSwitchTheme();

  return (
    <NotifierWrapper>
      <StatusBar
        barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkTheme ? '#000' : '#fff'}
      />
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </NotifierWrapper>
  );
}

export default App;
