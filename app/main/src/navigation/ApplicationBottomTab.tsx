import React, {FC, useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootStackParams} from './RootNavigation.type';
import {LoadingScreen} from './screens/LoadingScreen';
import {bottomTabs} from './bottomTabs';
import useAxios from 'axios-hooks';
import {ErrorScreen} from '../modules/error/ErrorScreen';

interface Props
  extends NativeStackScreenProps<RootStackParams, 'ApplicationBottomTab'> {}

export type ApplicationBottomTabParams = {
  HomeScreen: undefined;
  SearchScreen: undefined;
  CartScreen: undefined;
  FavoritesScreen: undefined;
  ProfileScreen: undefined;
};

const Tab = createBottomTabNavigator<ApplicationBottomTabParams>();

export const ApplicationBottomTab: FC<Props> = () => {
  const [{loading, error}, executeUserPopulate] = useAxios('/users/me', {
    manual: true,
  });

  // TODO: popular los datos recibidos dentro del estado global ´zustand´
  useEffect(() => {
    executeUserPopulate()
      .then(response => console.log(response.data))
      .catch(console.log);
  }, []);

  if (loading) return <LoadingScreen />;

  if (error) {
    return <ErrorScreen />;
  }

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 4,
        },
      }}>
      {bottomTabs.map(({TabComponent, TabIcon, TabName}, key) => (
        <Tab.Screen
          key={key.toString()}
          name={TabName}
          component={TabComponent}
          options={{
            tabBarIcon: props => <TabIcon {...props} />,
            // show badge with `9` if it's `CartScreen`
            tabBarBadge: TabName === 'CartScreen' ? 9 : undefined,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};
