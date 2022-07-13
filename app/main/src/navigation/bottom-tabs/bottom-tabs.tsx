import React from 'react';
import {ApplicationParams} from './Root';
import {
  HomeStack,
  SearchStack,
  CartStack,
  FavoritesStack,
  ProfileStack,
} from '@fastly/navigation/stacks';
import Icon from 'react-native-vector-icons/Ionicons';

type TabIconProps = {
  color: string;
  focused: boolean;
  size: number;
};

interface BottomTab {
  TabName: keyof ApplicationParams;
  TabComponent: React.FC<any>;
  TabIcon: React.FC<TabIconProps>;
  // TabIcon: ({color, focused, size}: TabIconProps) => JSX.Element;
}

export const bottomTabs: BottomTab[] = [
  {
    TabName: 'HomeStack',
    TabComponent: HomeStack,
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
    TabComponent: SearchStack,
    TabIcon: ({color, focused, size}) => (
      <Icon
        name={focused ? 'search' : 'search-outline'}
        color={color}
        size={size}
      />
    ),
  },
  {
    TabName: 'CartStack',
    TabComponent: CartStack,
    TabIcon: ({color, focused, size}) => (
      <Icon
        name={focused ? 'cart' : 'cart-outline'}
        color={color}
        size={size}
      />
    ),
  },
  {
    TabName: 'FavoritesStack',
    TabComponent: FavoritesStack,
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
    TabComponent: ProfileStack,
    TabIcon: ({color, focused, size}) => (
      <Icon
        name={focused ? 'person' : 'person-outline'}
        color={color}
        size={size}
      />
    ),
  },
];
