import React, {useEffect} from 'react';
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
import {HeaderScreen} from '../components/molecules/HeaderScreen';
import {WelcomeNewUserScreen} from './screens/WelcomeNewUserScreen';
import {isValidToken} from '../utils/isValidToken';
import {isTokenExpired} from '../utils/isTokenExpired';
import {http} from '../services/http.service';

export type RootStackParams = {
  /**
   * Unauthenticated
   */

  OnBoardingScreen: undefined;
  AuthenticationScreen: undefined;

  /**
   * Authenticated
   */

  // Geolocation Permissions and loading permissions
  LoadingScreen: undefined;
  GeolocationPermissionsScreen: undefined;

  // Welcome new users
  WelcomeNewUserScreen: undefined;
  // Ask for personal info only for new users
  AskPersonalInformationScreen: undefined;
  // Ask for first address only for new users
  AskLocationScreen: undefined;

  // Fastly App
  ApplicationBottomTab: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

export const RootNavigation = () => {
  const {theme} = useTheme();
  const locationStatus = usePermissionsStore(s => s.locationStatus);
  const accessToken = useAuthStore(s => s.accessToken);
  const refreshToken = useAuthStore(s => s.refreshToken);
  const setRefreshToken = useAuthStore(s => s.setRefreshToken);
  const setTokens = useAuthStore(s => s.setTokens);
  const hasTokens = !!useAuthStore(s => s.accessToken && s.refreshToken);
  const isNewUser = useAuthStore(s => s.isNewUser);

  const isAuthenticated =
    hasTokens &&
    isValidToken(accessToken) &&
    isValidToken(refreshToken) &&
    !isTokenExpired(accessToken) &&
    !isTokenExpired(refreshToken);

  useEffect(() => {
    if (refreshToken) {
      setRefreshToken(refreshToken);
    }
  }, [refreshToken]);

  useEffect(() => {
    if (!accessToken) return;

    http.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    http
      .get('/users/me')
      .then(({data}) => {
        // console.log('get /me');
        // setUser({...})
        // console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [accessToken]);

  useEffect(() => {
    if (!refreshToken) return;

    const initialRefreshTokens = async () => {
      const response = await http.post('/auth/facebook/refresh', {
        refreshToken,
      });

      if (response.data.accessToken) {
        http.interceptors.response.use(
          res => res,
          async error => {
            console.log('interceptor error');
            const response = await http.post('/auth/facebook/refresh', {
              refreshToken,
            });

            if (response.data.accessToken) {
              console.log('interceptor token refrescado');
              setTokens({accessToken: response.data.accessToken, refreshToken});

              if (error.config) {
                console.log('volver a intentar', error.config);

                error.config.headers.common[
                  'Authorization'
                ] = `Bearer ${response.data.accessToken}`;
                http.request(error.config);
              }
            }
          },
        );
        setTokens({accessToken: response.data.accessToken, refreshToken});
      }
    };

    initialRefreshTokens();
  }, []);

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
                  header: () => <HeaderScreen />,
                  contentStyle: {backgroundColor: theme.colors?.body ?? '#fff'},
                }}>
                <Stack.Screen
                  name="WelcomeNewUserScreen"
                  component={WelcomeNewUserScreen}
                />
                <Stack.Screen
                  name="AskLocationScreen"
                  component={AskLocationScreen}
                />
                <Stack.Screen
                  name="AskPersonalInformationScreen"
                  component={AskPersonalInformationScreen}
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
                header: () => <HeaderScreen />,
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
              header: () => <HeaderScreen />,
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
