import React, {FC} from 'react';
import {Div, Text} from 'react-native-magnus';
import {FavoritesScreenProps} from '../../navigation/screens/app/FavoritesScreen';

export const FavoritesController: FC<FavoritesScreenProps> = () => {
  return (
    <Div flex={1} bg="body">
      <Text>FavoritesScreen</Text>
    </Div>
  );
};
