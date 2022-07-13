import React from 'react';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {ApplicationParams} from '@fastly/navigation/bottom-tabs/Root';
import {CartController} from '@fastly/modules/cart/CartController';

export interface CartStackProps
  extends BottomTabScreenProps<ApplicationParams, 'CartStack'> {}

export const CartStack: React.FC<CartStackProps> = props => {
  return <CartController {...props} />;
};
