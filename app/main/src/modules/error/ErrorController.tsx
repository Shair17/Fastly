import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ErrorScreen} from './screens/ErrorScreen';

const ErrorStack = createNativeStackNavigator();

export const ErrorController = () => {
  return (
    <ErrorStack.Navigator
      initialRouteName="Error"
      screenOptions={{headerShown: false}}>
      <ErrorStack.Screen name="Error" component={ErrorScreen} />
    </ErrorStack.Navigator>
  );
};
