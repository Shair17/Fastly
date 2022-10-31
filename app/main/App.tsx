import React from 'react';
import {StatusBar} from 'react-native';
import {SocketProvider} from '@fastly/modules/socket/SocketProvider';
import {ThemeProvider} from 'react-native-magnus';
import {NotifierWrapper} from 'react-native-notifier';
import {useCheckLocationPermissions} from '@fastly/hooks/useCheckLocationPermission';
import {Root} from './src/Root';
import {useSystemColorScheme} from '@fastly/hooks/useSystemColorScheme';
import {lightTheme} from '@fastly/theme/lightTheme';
import {darkTheme} from '@fastly/theme/darkTheme';

function App() {
  useCheckLocationPermissions();
  const systemTheme = useSystemColorScheme();
  const isDarkTheme = systemTheme === 'dark';
  const theme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <SocketProvider>
      <NotifierWrapper>
        <StatusBar
          barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
          backgroundColor={isDarkTheme ? '#000' : '#fff'}
        />
        <ThemeProvider theme={theme}>
          <Root />
        </ThemeProvider>
      </NotifierWrapper>
    </SocketProvider>
  );
}

export default App;
