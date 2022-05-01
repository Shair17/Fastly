import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Div, Text, useTheme} from 'react-native-magnus';
import {useAuthStore} from '../stores/useAuthStore';
import {usePermissionsStore} from '../stores/usePermissionsStore';
import {GeolocationPermissionsScreen} from '../modules/geolocation-permissions/GeolocationPermissionsScreen';
import {AuthenticationScreen} from '../modules/authentication/AuthenticationScreen';
import {OnBoardingScreen} from '../modules/onboarding/OnBoardingScreen';
import {LoadingTemplate} from '../components/templates/LoadingTemplate';

export type RootStackParams = {
  OnBoardingScreen: undefined;
  AuthenticationScreen: undefined;
  LoadingScreen: undefined;
  GeolocationPermissions: undefined;
  App: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

const App = () => {
  return (
    <Div bg="body">
      <Text color="text">App</Text>
    </Div>
  );
};

export const RootNavigation = () => {
  const {theme} = useTheme();
  const locationStatus = usePermissionsStore(s => s.locationStatus);
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <Stack.Group
          screenOptions={{
            headerShown: false,
            contentStyle: {backgroundColor: theme.colors?.body ?? '#fff'},
          }}>
          {locationStatus === 'unavailable' ? (
            <Stack.Screen name="LoadingScreen" component={LoadingTemplate} />
          ) : locationStatus === 'granted' ? (
            <Stack.Screen name="App" component={App} />
          ) : (
            <Stack.Screen
              name="GeolocationPermissions"
              component={GeolocationPermissionsScreen}
            />
          )}
        </Stack.Group>
      ) : (
        <Stack.Group
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
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};
