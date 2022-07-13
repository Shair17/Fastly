import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from 'react-native-magnus';
import {useShowSessionIsExpired} from '@fastly/hooks/useShowSessionIsExpired';
import {useAuthStore} from '@fastly/stores/useAuthStore';
import {usePermissionsStore} from '@fastly/stores/usePermissionsStore';
import {isLoggedIn} from '@fastly/services/refresh-token';
import {BasicHeaderScreen} from '@fastly/components/molecules/BasicHeaderScreen';
import {LoadingScreen} from './screens/LoadingScreen';
import {WelcomeNewUserScreen} from './screens/WelcomeNewUserScreen';
import {AskPersonalInformationScreen} from './screens/AskPersonalInformationScreen';
import {AskLocationScreen} from './screens/AskLocationScreen';
import {GeolocationPermissionsScreen} from './screens/GeolocationPermissionsScreen';
import {OnBoardingScreen} from './screens/OnBoardingScreen';
import {AuthenticationScreen} from './screens/AuthenticationScreen';
import {Application} from './bottom-tabs/Root';

export type RootStackParams = {
  /**
   * Unauthenticated
   */
  OnBoardingScreen: undefined;
  AuthenticationScreen: undefined;

  /**
   * Authenticated
   */
  LoadingScreen: undefined;
  GeolocationPermissionsScreen: undefined;
  WelcomeNewUserScreen: undefined;
  AskPersonalInformationScreen: undefined;
  AskLocationScreen: {
    avatar?: string;
    email: string;
    phone: string;
    dni: string;
  };

  Application: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParams>();

export const Root: React.FC = () => {
  useShowSessionIsExpired();

  const {theme} = useTheme();
  const isAuthenticated = isLoggedIn();
  const isNewUser = useAuthStore(z => z.isNewUser);
  const locationStatus = usePermissionsStore(z => z.locationStatus);

  return (
    <RootStack.Navigator>
      {isAuthenticated ? (
        <RootStack.Group
          screenOptions={{
            headerShown: false,
            contentStyle: {backgroundColor: theme.colors?.body ?? '#fff'},
          }}>
          {locationStatus === 'unavailable' ? (
            <RootStack.Screen name="LoadingScreen" component={LoadingScreen} />
          ) : locationStatus === 'granted' ? (
            isNewUser ? (
              <RootStack.Group
                screenOptions={{
                  animation: 'slide_from_right',
                  headerShown: true,
                  header: () => <BasicHeaderScreen />,
                  contentStyle: {backgroundColor: theme.colors?.body ?? '#fff'},
                }}>
                <RootStack.Screen
                  name="WelcomeNewUserScreen"
                  component={WelcomeNewUserScreen}
                />
                <RootStack.Screen
                  name="AskPersonalInformationScreen"
                  component={AskPersonalInformationScreen}
                />
                <RootStack.Screen
                  name="AskLocationScreen"
                  component={AskLocationScreen}
                />
              </RootStack.Group>
            ) : (
              <RootStack.Screen name="Application" component={Application} />
            )
          ) : (
            <RootStack.Screen
              name="GeolocationPermissionsScreen"
              component={GeolocationPermissionsScreen}
              options={{
                headerShown: true,
                header: () => <BasicHeaderScreen />,
              }}
            />
          )}
        </RootStack.Group>
      ) : (
        <RootStack.Group
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            contentStyle: {backgroundColor: theme.colors?.body ?? '#fff'},
          }}>
          <RootStack.Screen
            name="OnBoardingScreen"
            component={OnBoardingScreen}
            options={{
              headerShown: true,
              header: () => <BasicHeaderScreen />,
            }}
          />
          <RootStack.Screen
            name="AuthenticationScreen"
            component={AuthenticationScreen}
          />
        </RootStack.Group>
      )}
    </RootStack.Navigator>
  );
};
