import React, {FC, useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {Div, Text, Icon} from 'react-native-magnus';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {OrderClass} from '@fastly/interfaces/app';
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

  const handleUpdateItemData = () => {
    setTimeAgo(formatDate(new Date(order.createdAt)));

    if (oneMinuteAdded < new Date(Date.now())) {
      setCanBeTaken(true);
    }
  };

  // useTimeout(handleUpdateItemData, interval);
  useInterval(handleUpdateItemData, interval);

  const handlePress = () => {
    handleUpdateItemData();

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

  useEffect(() => handleUpdateItemData(), []);

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
            {order.storeName}
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
            {order.userName} {order.userPhone}
          </Text>
        </Div>
      </Div>
    </TouchableOpacity>
  );
};
