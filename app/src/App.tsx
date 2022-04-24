import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from 'react-native-magnus';
import Bootsplash from 'react-native-bootsplash';

function App() {
  StatusBar.setBarStyle('dark-content');
  StatusBar.setBackgroundColor('#fff');

  return (
    <NavigationContainer onReady={() => Bootsplash.hide({fade: true})}>
      <ThemeProvider>
        <View>
          <Text>HOLA MUNDOOOOO!</Text>
        </View>
      </ThemeProvider>
    </NavigationContainer>
  );
}

export default App;
