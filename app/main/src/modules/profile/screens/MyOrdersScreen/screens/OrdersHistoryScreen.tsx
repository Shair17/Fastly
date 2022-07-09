import React, {FC} from 'react';
import {Div, Text} from 'react-native-magnus';
import useAxios from 'axios-hooks';

interface Props {}

// axios hooks pagination: https://codesandbox.io/s/axios-hooks-pagination-1wk3u

export const OrdersHistoryScreen: FC<Props> = () => {
  return (
    <Div>
      <Text>OrdersHistoryScreen</Text>
    </Div>
  );
};
