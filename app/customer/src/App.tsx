import React from 'react';
import {useColorScheme} from 'react-native';
import {Div, Text} from 'react-native-magnus';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Div flex={1} bg={isDarkMode ? '#000' : '#fff'}>
      <Text color={isDarkMode ? '#fff' : '#000'}>Hello world</Text>
    </Div>
  );
};

export default App;
