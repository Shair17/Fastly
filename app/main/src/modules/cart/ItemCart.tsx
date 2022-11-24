import React from 'react';
import useAxios from 'axios-hooks';
import {Div, Image, Text} from 'react-native-magnus';
import {Product} from '@fastly/interfaces/app';

interface Props {
  id: string;
}

export const ItemCart = ({id}: Props) => {
  const [{data}] = useAxios<Product>('/products/' + id);

  if (!data) return null;

  return (
    <Div mb="md" row shadow="xs" bg="body" rounded="lg" px="md" py="lg">
      <Div flex={1} mr="md">
        <Image rounded="lg" flex={1} source={{uri: data.image}} />
      </Div>
      <Div flex={5}>
        <Text color="primary" fontWeight="bold">
          {data.name}
        </Text>
        <Text fontSize="sm">
          {data.description || 'Este producto no tiene descripción.'}
        </Text>
      </Div>
      <Div justifyContent="center" alignItems="center">
        <Text color="primary" fontWeight="bold">
          S/. {data.price}
        </Text>
      </Div>
    </Div>
  );
};
