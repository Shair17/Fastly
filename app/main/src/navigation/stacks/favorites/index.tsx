import React from 'react';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {ApplicationParams} from '@fastly/navigation/bottom-tabs/Root';
import {FavoritesController} from '@fastly/modules/favorites/FavoritesController';

export interface FavoritesStackProps
  extends BottomTabScreenProps<ApplicationParams, 'CartStack'> {}

export const FavoritesStack: React.FC<FavoritesStackProps> = props => {
  return <FavoritesController {...props} />;
};
