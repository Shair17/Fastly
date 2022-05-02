import React from 'react';
import {ApplicationBottomTabParams} from './ApplicationBottomTab';
import {HomeScreen} from './screens/HomeScreen';
import {SearchScreen} from './screens/SearchScreen';
import {CartScreen} from './screens/CartScreen';
import {FavoritesScreen} from './screens/FavoritesScreen';
import {ProfileScreen} from './screens/ProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons';

type TabIconProps = {
  color: string;
  focused: boolean;
  size: number;
};

interface BottomTab {
  TabName: keyof ApplicationBottomTabParams;
  TabComponent: () => JSX.Element;
  TabIcon: ({color, focused, size}: TabIconProps) => JSX.Element;
}

export const bottomTabs: BottomTab[] = [
  {
    TabName: 'HomeScreen',
    TabComponent: HomeScreen,
    TabIcon: ({color, focused, size}) => (
      <Icon
        name={focused ? 'home' : 'home-outline'}
        color={color}
        size={size}
      />
    ),
  },
  {
    TabName: 'SearchScreen',
    TabComponent: SearchScreen,
    TabIcon: ({color, focused, size}) => (
      <Icon
        name={focused ? 'search' : 'search-outline'}
        color={color}
        size={size}
      />
    ),
  },
  {
    TabName: 'CartScreen',
    TabComponent: CartScreen,
    TabIcon: ({color, focused, size}) => (
      <Icon
        name={focused ? 'cart' : 'cart-outline'}
        color={color}
        size={size}
      />
    ),
  },
  {
    TabName: 'FavoritesScreen',
    TabComponent: FavoritesScreen,
    TabIcon: ({color, focused, size}) => (
      <Icon
        name={focused ? 'heart' : 'heart-outline'}
        color={color}
        size={size}
      />
    ),
  },
  {
    TabName: 'ProfileScreen',
    TabComponent: ProfileScreen,
    TabIcon: ({color, focused, size}) => (
      <Icon
        name={focused ? 'person' : 'person-outline'}
        color={color}
        size={size}
      />
    ),
  },
];
