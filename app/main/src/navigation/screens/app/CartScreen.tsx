import React, {FC} from 'react';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {ApplicationBottomTabParams} from '../../ApplicationBottomTab';
import {CartController} from '../../../modules/cart/CartController';

export interface CartScreenProps
  extends BottomTabScreenProps<ApplicationBottomTabParams, 'CartScreen'> {}

export const CartScreen: FC<CartScreenProps> = props => {
  return <CartController {...props} />;
};
