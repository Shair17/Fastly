import React from 'react';
import {Div, Text} from 'react-native-magnus';
import {OrderHistoryStackProps} from '@fastly/navigation/stacks/order-history';

export const OrderHistoryController: React.FC<OrderHistoryStackProps> = () => {
  return (
    <Div>
      <Text>OrderHistoryController</Text>
    </Div>
  );
};
