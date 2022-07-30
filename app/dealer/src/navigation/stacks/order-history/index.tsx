import React from 'react';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {ApplicationParams} from '@fastly/navigation/drawer/Root';
import {OrderHistoryController} from '@fastly/modules/order-history/OrderHistoryController';

export interface OrderHistoryStackProps
  extends DrawerScreenProps<ApplicationParams, 'OrderHistoryStack'> {}

export const OrderHistoryStack: React.FC<OrderHistoryStackProps> = props => {
  return <OrderHistoryController {...props} />;
};
