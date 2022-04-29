import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from 'react-native-magnus';
import {OnBoardingScreen} from '../../modules/onboarding/OnBoardingScreen';
import {AuthenticationScreen} from '../../modules/authentication/AuthenticationScreen';

const Stack = createNativeStackNavigator();

export const UnauthenticatedStack: FC = () => {
  const {theme} = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="OnBoardingScreen"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: {backgroundColor: theme.colors?.body ?? '#fff'},
      }}>
      <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
      <Stack.Screen
        name="AuthenticationScreen"
        component={AuthenticationScreen}
      />
    </Stack.Navigator>
  );
};
