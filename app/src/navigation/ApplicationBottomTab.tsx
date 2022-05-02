import React, {FC} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootStackParams} from './RootNavigation';
import {bottomTabs} from './bottomTabs';

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
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 4, // default: 0
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
