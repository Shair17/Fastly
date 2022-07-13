import React, {FC, useState} from 'react';
import {Div, Text} from 'react-native-magnus';
import {PullToRefresh} from '@fastly/components/templates/PullToRefresh';
import {CartStackProps} from '@fastly/navigation/stacks/cart';
import {CartControllerHeader} from './CartControllerHeader';
import {EmptyCart} from './EmptyCart';

export const CartController: FC<CartStackProps> = ({navigation}) => {
  const [hasFavorites, setHasFavorites] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const goToHome = () => {
    navigation.navigate('HomeStack');
  };

  return (
    <Div flex={1} bg="body">
      <CartControllerHeader />
      {hasFavorites ? (
        <PullToRefresh refreshing={refreshing} onRefresh={onRefresh}>
          <Div bg="red" flex={1}>
            <Text>Hola</Text>
          </Div>
        </PullToRefresh>
      ) : (
        <EmptyCart goToHome={goToHome} />
      )}
    </Div>
  );
};
