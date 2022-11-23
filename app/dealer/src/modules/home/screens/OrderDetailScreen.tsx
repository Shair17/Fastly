import React, {FC, useEffect} from 'react';
import {Div, Text} from 'react-native-magnus';
import {Map, TMarker} from '@fastly/components/atoms/Map';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParams} from '../HomeController';
import {objectIsEmpty} from '@fastly/utils/objectIsEmpty';
import {formatDate} from '@fastly/utils/formatDate';
import {Button} from '@fastly/components/atoms/Button';
import {useLocation} from '@fastly/hooks/useLocation';
import {useDealerStore} from '@fastly/stores/useDealerStore';

interface Props
  extends NativeStackScreenProps<HomeStackParams, 'OrderDetailScreen'> {}

export const OrderDetailScreen: FC<Props> = ({navigation, route}) => {
  const order = route.params;
  const {userLocation} = useLocation();
  const name = useDealerStore(s => s.name);
  const markers: TMarker[] = [
    {
      // TODO: reemplazar por el nombre de la persona q hizo el pedido
      title: 'Aquí poner el nombre de la persona que hizo el pedido',
      description: `${order.order.address.street} ${order.order.address.city}`,
      coordinate: {
        latitude: order.coordinates.latitude,
        longitude: order.coordinates.longitude,
      },
    },
    {
      title: name,
      description: 'Tú ubicación ahora mismo',
      coordinate: userLocation,
    },
  ];

  const handleGoBack = () => navigation.goBack();

  const handleTakeOrder = () => console.log(`Taking order with id ${order.id}`);

  useEffect(() => {
    if (objectIsEmpty(order)) {
      navigation.navigate('HomeScreen');
    }
  }, [order]);

  return (
    <Div flex={1} p="2xl">
      <Div>
        <Text fontWeight="bold" fontSize="6xl">
          Pedido para {order.order.userId}
        </Text>
        <Text fontSize="sm">{formatDate(new Date(order.order.createdAt))}</Text>
      </Div>

      <Div flex={1} py="lg">
        <Div flex={3}>
          <Map markers={markers} />
        </Div>
        <Div flex={3} py="lg">
          <Text fontWeight="500" fontSize="2xl" mb="md">
            <Text fontWeight="bold" fontSize="2xl">
              Pedido:{' '}
            </Text>
            {order.order.products.map((product, key) => (
              <Text key={key.toString()}>
                {product.name} S/. {product.price}{' '}
              </Text>
            ))}
          </Text>
          <Text fontWeight="500" fontSize="2xl" mb="md">
            <Text fontWeight="bold" fontSize="2xl">
              Cantidad:{' '}
            </Text>
            {order.order.quantity}{' '}
            {order.order.quantity > 1 ? 'unidades' : 'unidad'}
          </Text>
          <Text fontWeight="500" fontSize="2xl" mb="md">
            {order.order.products.map((product, key) => (
              <>
                <Text fontWeight="bold" fontSize="2xl">
                  Establecimiento(s):{' '}
                </Text>
                {product.storeId}
              </>
            ))}
          </Text>
          <Text fontWeight="500" fontSize="2xl" mb="md">
            <Text fontWeight="bold" fontSize="2xl">
              Dirección:{' '}
            </Text>
            {order.order.address.street} {order.order.address.city}
          </Text>
          <Text fontWeight="500" fontSize="2xl" mb="md">
            <Text fontWeight="bold" fontSize="2xl">
              Para:{' '}
            </Text>
            {order.order.userId}
          </Text>
          <Text fontSize="xs" color="gray400" mt="md">
            Pedido con id {order.id}
          </Text>
        </Div>
      </Div>

      <Div row justifyContent="space-between">
        <Button
          fontWeight="600"
          fontSize="2xl"
          w={150}
          borderWidth={1}
          borderColor="primary"
          bg="transparent"
          color="primary"
          underlayColor="red100"
          onPress={handleGoBack}>
          Cancelar
        </Button>
        <Button
          w={150}
          borderWidth={1}
          borderColor="primary"
          shadow="xs"
          fontWeight="600"
          fontSize="2xl"
          onPress={handleTakeOrder}>
          Tomar
        </Button>
      </Div>
    </Div>
  );
};
