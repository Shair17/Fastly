import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Div, Text} from 'react-native-magnus';
import {HomeStackParamList} from '../HomeController';
import {useFavoritesStore} from '@fastly/stores/useFavoritesStore';
import {useCartStore} from '@fastly/stores/useCartStore';
import useAxios from 'axios-hooks';
import {Product} from '@fastly/interfaces/app';

interface Props extends NativeStackScreenProps<HomeStackParamList, 'Product'> {}

export const ProductScreen: React.FC<Props> = ({navigation, route}) => {
  const id = route.params.id;
  const [
    {error: productError, loading: productIsLoading, data: product},
    refetchProduct,
  ] = useAxios<Product[]>(`/products/${id}`, {
    useCache: false,
  });

  return (
    <Div flex={1} alignItems="center" justifyContent="center">
      <Text>ProductScreen</Text>
    </Div>
  );
};
