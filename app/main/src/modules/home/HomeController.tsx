import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStackProps} from '@fastly/navigation/stacks/home';
import {HomeScreen} from './screens/HomeScreen';

const HomeStack = createNativeStackNavigator();

export const HomeController: React.FC<HomeStackProps> = ({navigation}) => {
  return (
    <HomeStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};
