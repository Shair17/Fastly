import React, {FC, useState} from 'react';
import {Div, Text} from 'react-native-magnus';
import useAxios from 'axios-hooks';

interface Props {}

// axios hooks pagination: https://codesandbox.io/s/axios-hooks-pagination-1wk3u

export const OrdersHistoryScreen: FC<Props> = () => {
  // DEJE TODO LISTO PARA LA PAGINACION DE LAS ORDENES
  // al inicio, siempre se cargaran las take = 10 primeras ordenes, y skip es para saltarse algunas, al inicio el skip es 0
  // En la segunda peticion, take ya no será 10, si no 20, y skip no será 0, si no 10
  // y así sucesivamente...

  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [{data, loading, error}, execute] = useAxios({
    url: '/users/me/orders',
    params: {
      orderBy: 'desc',
      take,
      skip,
    },
  });

  console.log({data, loading, error});

  return (
    <Div flex={1}>
      <Text>OrdersHistoryScreen</Text>
    </Div>
  );
};
