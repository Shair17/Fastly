import React, {FC, useEffect} from 'react';
import {FlatList} from 'react-native';
import {Div, Text} from 'react-native-magnus';
import {EmptyOrderQueue} from '@fastly/components/molecules/EmptyOrderQueue';
import {OrderQueueItem} from '@fastly/components/molecules/OrderQueueItem';
import {useSocketOrdersQueue} from '@fastly/hooks/useSocketOrdersQueue';
import {addMinutesToDate} from '@fastly/utils/addMinutesToDate';
import {HomeStackParams} from '../HomeController';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

interface Props extends NativeStackScreenProps<HomeStackParams, 'HomeScreen'> {}

export const HomeScreen: FC<Props> = ({navigation}) => {
  const {ordersPendingQueue} = useSocketOrdersQueue();

  return (
    <Div bg="body">
      <FlatList
        contentContainerStyle={{paddingBottom: 80}}
        style={{
          width: '100%',
        }}
        data={ordersPendingQueue}
        renderItem={({item: {id, order, coordinates}}) => {
          return (
            <Div mb="lg" mx="2xl" key={id}>
              <OrderQueueItem
                id={id}
                order={order}
                coordinates={coordinates}
                onPress={() => {
                  navigation.navigate('OrderDetailScreen', {
                    id,
                    order,
                    coordinates,
                  });
                }}
                oneMinuteAdded={addMinutesToDate(new Date(order.createdAt))}
              />
            </Div>
          );
        }}
        keyExtractor={item => item.toString()}
        ListHeaderComponent={() => {
          if (ordersPendingQueue.length === 0) return null;

          return (
            <Div p="2xl">
              <Text fontSize="6xl" fontWeight="bold" color="text">
                Elige un pedido para realizar
              </Text>
              <Text mt="md" color="text">
                Los pedidos en amarillo pueden ser cancelados (máximo en 1
                minuto desde su creación), y los verdes están listos para ser
                elegidos.
              </Text>
            </Div>
          );
        }}
        ListEmptyComponent={() => <EmptyOrderQueue />}
      />
    </Div>
  );
};
