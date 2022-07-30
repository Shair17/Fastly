import React from 'react';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Div, Text} from 'react-native-magnus';
import {HomeStackProps} from '@fastly/navigation/stacks/home';

// const HomeStack = createNativeStackNavigator();

export const HomeController: React.FC<HomeStackProps> = ({navigation}) => {
  return (
    <Div>
      <Text>HomeController</Text>
    </Div>
  );

  // return (
  // <HomeStack.Navigator
  // screenOptions={{headerShown: false}}
  // initialRouteName="Home">
  // <HomeStack.Screen name="Home" component={HomeScreen} />
  // </HomeStack.Navigator>
  // );
};
