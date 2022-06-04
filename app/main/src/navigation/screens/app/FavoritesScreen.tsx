import React, {FC} from 'react';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {ApplicationBottomTabParams} from '../../ApplicationBottomTab';
import {FavoritesController} from '../../../modules/favorites/FavoritesController';

export interface FavoritesScreenProps
  extends BottomTabScreenProps<ApplicationBottomTabParams, 'FavoritesScreen'> {}

export const FavoritesScreen: FC<FavoritesScreenProps> = props => {
  return <FavoritesController {...props} />;
};
