import React, {useState, useEffect} from 'react';
import {Div, Text} from 'react-native-magnus';
import useAxios from 'axios-hooks';
import {OrderHistoryStackProps} from '@fastly/navigation/stacks/order-history';
import {Order} from '@fastly/interfaces/app';
import {LoadingScreen} from '@fastly/navigation/screens';
import {FlatList} from 'react-native';
import {Button} from '@fastly/components/atoms/Button';
import {ActivityIndicator} from '@fastly/components/atoms/ActivityIndicator';
import {MyOrderHistoryItem} from '@fastly/components/organisms/MyOrderHistoryItem';

const MAX_ORDERS_PER_REQUEST = 10;

const _orders: Order[] = [
  {
    id: '123',
    updatedAt: '2022-08-09T03:28:47.405Z',
    deliveryPrice: 12,
    address: {
      id: '321',
      city: 'chepen',
      createdAt: 'hoy',
      instructions: 'sadas',
      latitude: 123,
      longitude: 334,
      name: 'asdas',
      street: 'asdsa',
      tag: 'AMIGO',
      updatedAt: 'casa',
      zip: 'asawqe',
    },
    product: {
      id: '345',
      blurHash: 'qqwqewq',
      couponId: '22qw',
      createdAt: 'hoy',
      description: 'asdas',
      image: 'dasdsa',
      name: 'dasdas',
      price: 234,
      storeId: '33232',
      updatedAt: 'qwewq',
    },
    quantity: 1,
    createdAt: '2022-08-09T03:28:19.774Z',
    status: 'DELIVERED',
  },
];

export const OrderHistoryController: React.FC<OrderHistoryStackProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [noMoreOrders, setNoMoreOrders] = useState<boolean>(false);
  const [myOrders, setMyOrders] = useState<Order[]>(_orders);
  const [skip, setSkip] = useState<number>(0);
  const [
    {
      data: myOrdersCount,
      loading: myOrdersCountLoading,
      error: myOrdersCountError,
    },
    refetchMyOrdersCount,
  ] = useAxios<number>('/dealers/me/orders-count');
  const [{loading: myOrdersLoading, error: myOrdersError}, fetchMyOrders] =
    useAxios<Order[]>(
      `/dealers/me/orders?take=${MAX_ORDERS_PER_REQUEST}&skip=${skip}&orderBy=desc`,
      {manual: true},
    );

  const fetchItems = () => {
    setIsLoading(true);
    refetchMyOrdersCount();
    fetchMyOrders()
      .then(response => {
        setMyOrders(prevState => {
          return [...prevState, ...response.data];
        });
        setIsLoading(false);
        setNoMoreOrders(response.data.length !== 10);
      })
      .finally(() => setIsLoading(false));
  };

  const fetchMore = () => {
    setSkip(skip + MAX_ORDERS_PER_REQUEST);
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (myOrdersCountLoading || myOrdersLoading) return <LoadingScreen />;

  if (myOrdersCountError || myOrdersError) {
    return (
      <Div flex={1} p="2xl">
        <Text fontWeight="bold" fontSize="6xl">
          Oops, ha ocurrido un error :(
        </Text>
      </Div>
    );
  }

  return (
    <Div bg="body">
      <FlatList
        contentContainerStyle={{marginBottom: 10}}
        style={{
          width: '100%',
        }}
        data={myOrders}
        keyExtractor={item => item.id}
        renderItem={({
          item: {
            id,
            address,
            createdAt,
            updatedAt,
            deliveryPrice,
            product,
            quantity,
            status,
            arrivalTime,
            message,
          },
        }) => (
          <Div mb="lg" mx="2xl">
            <MyOrderHistoryItem
              id={id}
              address={address}
              product={product}
              deliveryPrice={deliveryPrice}
              quantity={quantity}
              status={status}
              arrivalTime={arrivalTime}
              message={message}
              createdAt={createdAt}
              updatedAt={updatedAt}
            />
          </Div>
        )}
        ListHeaderComponent={() => {
          return (
            <Div p="2xl">
              <Div alignItems="center">
                <Text color="text" mb="lg" fontWeight="bold" fontSize="2xl">
                  Mis Pedidos: {myOrdersCount!.toString()}
                </Text>
              </Div>
            </Div>
          );
        }}
        ListFooterComponent={() => {
          if (myOrders.length === 0) return null;

          return (
            <Div
              bg="body"
              flex={1}
              alignItems="center"
              justifyContent="center"
              mt="lg"
              mb="xl">
              {isLoading ? (
                <Div alignItems="center" justifyContent="center">
                  <ActivityIndicator />
                  <Text mt="sm">Cargando...</Text>
                </Div>
              ) : null}

              {noMoreOrders ? (
                <Text fontWeight="600" fontSize="lg">
                  Haz llegado al final.
                </Text>
              ) : null}
            </Div>
          );
        }}
        ListEmptyComponent={() => {
          return (
            <Div flex={1} px="2xl">
              <Text fontWeight="bold" fontSize="xl">
                Aún to tienes pedidos disponibles
              </Text>
              <Button
                mt="xl"
                fontWeight="600"
                block
                loading={isLoading}
                onPress={fetchItems}>
                Recargar
              </Button>
            </Div>
          );
        }}
        // onEndReachedThreshold={0.2}
        // onEndReached={fetchMore}
      />
    </Div>
  );
};
