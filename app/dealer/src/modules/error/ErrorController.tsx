import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ErrorScreen} from './screens/ErrorScreen';

export type ErrorStackParmas = {
  Error: undefined;
};

const ErrorStack = createNativeStackNavigator<ErrorStackParmas>();

export const ErrorController = () => {
  return (
    <ErrorStack.Navigator
      initialRouteName="Error"
      screenOptions={{
        animation: 'slide_from_right',
        headerShown: false,
      }}>
      <ErrorStack.Screen name="Error" component={ErrorScreen} />
    </ErrorStack.Navigator>
  );
};
