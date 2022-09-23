import React, {FC, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Div, Text, Icon} from 'react-native-magnus';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {OrderClass} from '@fastly/interfaces/app';
import {useTimeout} from '@fastly/hooks/useTimeout';
import {formatDate} from '@fastly/utils/formatDate';
import {useInterval} from '@fastly/hooks/useInterval';

interface Props extends OrderClass {
  onPress: () => void;
  oneMinuteAdded: Date;
}

export const OrderQueueItem: FC<Props> = ({
  onPress,
  order,
  coordinates,
  id,
  oneMinuteAdded,
}) => {
  const [timeAgo, setTimeAgo] = useState(formatDate(new Date(order.createdAt)));
  const [canBeTaken, setCanBeTaken] = useState(
    oneMinuteAdded < new Date(Date.now()),
  );
  const interval =
    oneMinuteAdded.getTime() - new Date(order.createdAt).getTime();
  const borderColor = canBeTaken ? 'green500' : 'yellow500';
  const bg = canBeTaken ? 'green500' : 'yellow50';
  const color = canBeTaken ? 'white' : 'yellow900';

  const handleCanBeTaken = () => {
    if (oneMinuteAdded < new Date(Date.now())) {
      setCanBeTaken(true);
    }
  };

  useTimeout(handleCanBeTaken, interval);

  // TODO Remover luego, puede que no sea una buena práctica tener esto aquí
  useInterval(() => {
    handleCanBeTaken();
    setTimeAgo(formatDate(new Date(order.createdAt)));
  }, interval);
  // TODO

  const handlePress = () => {
    if (!canBeTaken) {
      Notifier.showNotification({
        title: 'Advertencia',
        description: 'Aún no puedes elegir este pedido.',
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: 'warn',
        },
      });

      return;
    }

    onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Div
        borderWidth={1}
        borderColor={borderColor}
        rounded="md"
        bg={bg}
        p="md"
        py="lg"
        row>
        <Div position="absolute" left={4} bottom={2}>
          <Text fontWeight="bold" color={color} fontSize={8}>
            {timeAgo}
          </Text>
        </Div>
        <Div flex={1} justifyContent="center" alignItems="center">
          <Icon
            fontFamily="Ionicons"
            name="pricetag"
            color={color}
            fontSize={42}
            mb="sm"
          />
        </Div>
        <Div flex={3} ml="md">
          {/* producto: nombre y precio */}
          <Text color={color} fontWeight="500">
            <Text color={color} fontWeight="bold">
              Pedido:{' '}
            </Text>
            {order.product.name} S/.{order.product.price}
          </Text>
          <Text color={color} fontWeight="500">
            <Text color={color} fontWeight="bold">
              Cantidad:{' '}
            </Text>
            {order.quantity} {order.quantity > 1 ? 'unidades' : 'unidad'}
          </Text>
          <Text color={color} fontWeight="500">
            <Text color={color} fontWeight="bold">
              Establecimiento:{' '}
            </Text>
            {/** Reemplazar storeId con el nombre de la tienda */}
            {/* MonasPizzas */}
            {order.product.storeId}
          </Text>
          <Text color={color} fontWeight="500">
            <Text color={color} fontWeight="bold">
              Dirección:{' '}
            </Text>
            {order.address.street} {order.address.city}
          </Text>
          <Text color={color} fontWeight="500">
            <Text color={color} fontWeight="bold">
              Para:{' '}
            </Text>
            {/** Reemplazar el userId por Nombre del usuario y telefono del usuario como: Jimmy Morales - 966107266 */}
            {order.userId}
          </Text>
        </Div>
      </Div>
    </TouchableOpacity>
  );
};
