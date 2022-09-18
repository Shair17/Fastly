import React, {FC, useState, Fragment} from 'react';
import {FlatList} from 'react-native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Div, Text, Icon} from 'react-native-magnus';
import {HomeStackProps} from '@fastly/navigation/stacks/home';
import {useSocketOrdersQueue} from '@fastly/hooks/useSocketOrdersQueue';
import {EmptyOrderQueue} from '@fastly/components/molecules/EmptyOrderQueue';
import {SwipeablePanel} from 'rn-swipeable-panel';
import {OrderQueueItem} from '@fastly/components/molecules/OrderQueueItem';
import {getRandomBoolean} from '@fastly/utils/getRandomBoolean';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {useSocketHasActiveOrders} from '@fastly/hooks/useSocketHasActiveOrders';

// const HomeStack = createNativeStackNavigator();

export const HomeController: FC<HomeStackProps> = ({navigation}) => {
  const [isActive, setIsActive] = useState(false);
  const hasActiveOrders = useSocketHasActiveOrders();
  // const {ordersPendingQueue} = useSocketOrdersQueue();
  const ordersPendingQueue: any[] = [1, 2, 3, 4, 5];

  if (hasActiveOrders) {
    return (
      <Div>
        <Text>Aquí renderizar la orden activa actual.</Text>
      </Div>
    );
  }

  return (
    <Fragment>
      <Div bg="body">
        <FlatList
          contentContainerStyle={{paddingBottom: 80}}
          style={{
            width: '100%',
          }}
          data={ordersPendingQueue}
          renderItem={({item}) => {
            const canBeTaken = getRandomBoolean();

            return (
              <Div mb="lg" mx="2xl" key={item.toString()}>
                <OrderQueueItem
                  canBeTaken={canBeTaken}
                  onPress={() => {
                    if (!canBeTaken) {
                      Notifier.showNotification({
                        title: 'Advertencia',
                        description: 'Aún no puedes elegir este pedido',
                        Component: NotifierComponents.Alert,
                        componentProps: {
                          alertType: 'warn',
                        },
                      });

                      return;
                    }

                    setIsActive(true);
                  }}
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
      <SwipeablePanel
        isActive={isActive}
        fullWidth
        onClose={() => setIsActive(false)}
        closeOnTouchOutside
        openLarge
        showCloseButton>
        <Div>
          <Text>Hello World</Text>
        </Div>
      </SwipeablePanel>
    </Fragment>
  );

  // return (
  // <HomeStack.Navigator
  // screenOptions={{headerShown: false}}
  // initialRouteName="Home">
  // <HomeStack.Screen name="Home" component={HomeScreen} />
  // </HomeStack.Navigator>
  // );
};
