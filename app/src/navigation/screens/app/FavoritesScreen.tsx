import React, {FC} from 'react';
import {Div, Text} from 'react-native-magnus';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {ApplicationBottomTabParams} from '../../ApplicationBottomTab';

export interface FavoritesScreenProps
  extends BottomTabScreenProps<ApplicationBottomTabParams, 'FavoritesScreen'> {}

export const FavoritesScreen: FC<FavoritesScreenProps> = () => {
  return (
    <Div>
      <Text>FavoritesScreen</Text>
    </Div>
  );
};
