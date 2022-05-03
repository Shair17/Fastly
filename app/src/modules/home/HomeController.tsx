import React, {FC} from 'react';
import {Div, Text} from 'react-native-magnus';
import {HomeScreenProps} from '../../navigation/screens/app/HomeScreen';

export const HomeController: FC<HomeScreenProps> = () => {
  return (
    <Div flex={1} bg="body">
      <Text>HomeScreen</Text>
    </Div>
  );
};
