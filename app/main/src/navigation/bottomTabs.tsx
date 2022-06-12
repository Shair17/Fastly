import React, {FC} from 'react';
import {ApplicationBottomTabParams} from './ApplicationBottomTab';
import {HomeScreen} from './screens/app/HomeStack';
import {SearchScreen} from './screens/app/SearchStack';
import {CartScreen} from './screens/app/CartScreen';
import {FavoritesScreen} from './screens/app/FavoritesScreen';
import {ProfileScreen} from './screens/app/ProfileStack';
import Icon from 'react-native-vector-icons/Ionicons';

type TabIconProps = {
  color: string;
  focused: boolean;
  size: number;
};

interface BottomTab {
  TabName: keyof ApplicationBottomTabParams;
  TabComponent: FC<any>;
  TabIcon: ({color, focused, size}: TabIconProps) => JSX.Element;
}

export const bottomTabs: BottomTab[] = [
  {
    TabName: 'HomeStack',
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
    TabName: 'SearchStack',
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
    TabName: 'ProfileStack',
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
