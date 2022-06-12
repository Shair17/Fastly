import React, {FC} from 'react';
import {HomeScreenProps} from '../../navigation/screens/app/HomeStack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './screens/HomeScreen';

const HomeStack = createNativeStackNavigator();

export const HomeController: FC<HomeScreenProps> = ({navigation}) => {
  return (
    <HomeStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};
