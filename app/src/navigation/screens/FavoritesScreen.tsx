import React, {FC} from 'react';
import {Div, Text} from 'react-native-magnus';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {ApplicationBottomTabParams} from '../ApplicationBottomTab';

interface Props
  extends BottomTabScreenProps<ApplicationBottomTabParams, 'FavoritesScreen'> {}

export const FavoritesScreen: FC<Props> = () => {
  return (
    <Div>
      <Text>FavoritesScreen</Text>
    </Div>
  );
};
