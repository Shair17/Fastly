import React, {FC} from 'react';
import {Div, Text} from 'react-native-magnus';
import {CartScreenProps} from '../../navigation/screens/app/CartScreen';

export const CartController: FC<CartScreenProps> = () => {
  return (
    <Div flex={1} bg="body">
      <Text>CartScreen</Text>
    </Div>
  );
};
