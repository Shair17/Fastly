import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from 'react-native-magnus';
import {OnBoardingScreen} from './screens/OnBoardingScreen';
import {AuthenticationScreen} from './screens/AuthenticationScreen';
import {LoadingScreen} from './screens/LoadingScreen';
import {GeolocationPermissionsScreen} from './screens/GeolocationPermissionsScreen';
import {AskPersonalInformationScreen} from './screens/AskPersonalInformationScreen';
import {AskLocationScreen} from './screens/AskLocationScreen';
import {ApplicationBottomTab} from './ApplicationBottomTab';
import {useAuthStore} from '../stores/useAuthStore';
import {usePermissionsStore} from '../stores/usePermissionsStore';
import {BasicHeaderScreen} from '../components/molecules/BasicHeaderScreen';
import {WelcomeNewUserScreen} from './screens/WelcomeNewUserScreen';
import {RootStackParams} from './RootNavigation.type';
import {isLoggedIn} from '../services/refresh-token.service';
import {useShowSessionIsExpired} from '../hooks/useShowSessionIsExpired';

const Stack = createNativeStackNavigator<RootStackParams>();

export const RootNavigation = () => {
  useShowSessionIsExpired();
  const isNewUser = useAuthStore(s => s.isNewUser);
  const isAuthenticated = isLoggedIn();

  const {theme} = useTheme();

  const locationStatus = usePermissionsStore(s => s.locationStatus);

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <Stack.Group
          screenOptions={{
            headerShown: false,
            contentStyle: {backgroundColor: theme.colors?.body ?? '#fff'},
          }}>
          {locationStatus === 'unavailable' ? (
            <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
          ) : locationStatus === 'granted' ? (
            isNewUser ? (
              <Stack.Group
                screenOptions={{
                  animation: 'slide_from_right',
                  headerShown: true,
                  header: () => <BasicHeaderScreen />,
                  contentStyle: {backgroundColor: theme.colors?.body ?? '#fff'},
                }}>
                <Stack.Screen
                  name="WelcomeNewUserScreen"
                  component={WelcomeNewUserScreen}
                />
                <Stack.Screen
                  name="AskPersonalInformationScreen"
                  component={AskPersonalInformationScreen}
                />
                <Stack.Screen
                  name="AskLocationScreen"
                  component={AskLocationScreen}
                />
              </Stack.Group>
            ) : (
              // Application Bottom Tab Navigator
              // Acá crear todas las pantallas necesarias como: Categorías, Producto, etc...
              <Stack.Screen
                name="ApplicationBottomTab"
                component={ApplicationBottomTab}
              />
            )
          ) : (
            <Stack.Screen
              name="GeolocationPermissionsScreen"
              component={GeolocationPermissionsScreen}
              options={{
                headerShown: true,
                header: () => <BasicHeaderScreen />,
              }}
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
          <Stack.Screen
            name="OnBoardingScreen"
            component={OnBoardingScreen}
            options={{
              headerShown: true,
              header: () => <BasicHeaderScreen />,
            }}
          />
          <Stack.Screen
            name="AuthenticationScreen"
            component={AuthenticationScreen}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};
