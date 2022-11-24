import React, {FC, useState} from 'react';
import {Div, Text} from 'react-native-magnus';
import {ScrollView} from 'react-native';
import {CartStackProps} from '@fastly/navigation/stacks/cart';
import {CartControllerHeader} from './CartControllerHeader';
import {EmptyCart} from './EmptyCart';
import {useCartStore} from '@fastly/stores/useCartStore';
import {ItemCart} from './ItemCart';
import {Button} from '@fastly/components/atoms/Button';

export const CartController: FC<CartStackProps> = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const cart = useCartStore(s => s.cart);

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
      {cart.length > 0 ? (
        <ScrollView style={{flex: 1}}>
          <Div p="2xl">
            {cart.map((item, key) => (
              // @ts-ignore
              <ItemCart key={item.id} id={item.productId} />
            ))}
            <Button block fontWeight="bold" fontSize="lg">
              Pedir
            </Button>
          </Div>
        </ScrollView>
      ) : (
        <EmptyCart goToHome={goToHome} />
      )}
    </Div>
  );
};
