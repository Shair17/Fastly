import React from 'react';
import {ApplicationParams} from './Root';
import {
  HomeStack,
  OrderHistoryStack,
  ProfileStack,
  ReviewsStack,
  SettingsStack,
} from '@fastly/navigation/stacks';
import Icon from 'react-native-vector-icons/Ionicons';

type DrawerIconProps = {
  color: string;
  focused: boolean;
  size: number;
};

interface DrawerTab {
  DrawerName: keyof ApplicationParams;
  DrawerComponent: React.FC<any>;
  DrawerIcon: React.FC<DrawerIconProps>;
  title: string;
}

export const drawerTabs: DrawerTab[] = [
  {
    DrawerName: 'HomeStack',
    DrawerComponent: HomeStack,
    DrawerIcon: ({color, focused, size}) => (
      <Icon
        name={focused ? 'home' : 'home-outline'}
        color={color}
        size={size}
      />
    ),

    title: 'Inicio',
  },
  {
    DrawerName: 'ReviewsStack',
    DrawerComponent: ReviewsStack,
    DrawerIcon: ({color, focused, size}) => (
      <Icon
        name={focused ? 'document-text' : 'document-text-outline'}
        color={color}
        size={size}
      />
    ),
    title: 'Mis Reseñas',
  },
  {
    DrawerName: 'OrderHistoryStack',
    DrawerComponent: OrderHistoryStack,
    DrawerIcon: ({color, focused, size}) => (
      <Icon
        name={focused ? 'archive' : 'archive-outline'}
        color={color}
        size={size}
      />
    ),
    title: 'Historial de Pedidos',
  },
  {
    DrawerName: 'ProfileStack',
    DrawerComponent: ProfileStack,
    DrawerIcon: ({color, focused, size}) => (
      <Icon
        name={focused ? 'person' : 'person-outline'}
        color={color}
        size={size}
      />
    ),
    title: 'Perfil',
  },
  {
    DrawerName: 'SettingsStack',
    DrawerComponent: SettingsStack,
    DrawerIcon: ({color, focused, size}) => (
      <Icon
        name={focused ? 'settings' : 'settings-outline'}
        color={color}
        size={size}
      />
    ),
    title: 'Configuración',
  },
];
