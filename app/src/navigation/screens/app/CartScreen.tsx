import React, {FC} from 'react';
import {Div, Text} from 'react-native-magnus';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {ApplicationBottomTabParams} from '../../ApplicationBottomTab';

export interface CartScreenProps
  extends BottomTabScreenProps<ApplicationBottomTabParams, 'CartScreen'> {}

export const CartScreen: FC<CartScreenProps> = () => {
  return (
    <Div>
      <Text>CartScreen</Text>
    </Div>
  );
};
