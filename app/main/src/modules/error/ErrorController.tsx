import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ErrorScreen} from './screens/ErrorScreen';
import {MiniGameController} from '../minigame/MiniGameController';
import {useMinigameStore} from '../../stores/useMinigameStore';

export type ErrorStackParmas = {
  Error: undefined;
  Minigame: undefined;
};

const ErrorStack = createNativeStackNavigator<ErrorStackParmas>();

export const ErrorController = () => {
  const keepMinigame = useMinigameStore(m => m.keep);

  return (
    <ErrorStack.Navigator
      initialRouteName={keepMinigame ? 'Minigame' : 'Error'}
      screenOptions={{
        animation: 'slide_from_right',
        headerShown: false,
      }}>
      <ErrorStack.Screen name="Error" component={ErrorScreen} />
      <ErrorStack.Screen name="Minigame" component={MiniGameController} />
    </ErrorStack.Navigator>
  );
};
