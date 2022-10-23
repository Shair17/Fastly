import React from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import {Div, Text} from 'react-native-magnus';
import {Order} from '@fastly/interfaces/app';
import {format as timeAgoFormat} from 'timeago.js';
import differenceInMinutes from 'date-fns/differenceInMinutes';

interface Props extends Order {}

export const MyOrderHistoryItem: React.FC<Props> = ({
  id,
  address,
  message,
  quantity,
  products,
  deliveryPrice,
  status,
  arrivalTime,
  createdAt,
  updatedAt,
}) => {
  const handleOpenMoreInfo = () => {
    const productsNames = products.map(product => product.name);
    const displayProducts = productsNames.join(', ');

    Alert.alert(
      `Tu Pedido con id: ${id}`,
      `Se ha llevado: ${displayProducts}, Dirección: ${
        address.name
      }, Cantidad: ${quantity}, Precio del Delivery: ${deliveryPrice}${
        arrivalTime ? `, Hora de Llegada: ${arrivalTime}` : ''
      }${
        message ? `Mensaje: ${message}` : ''
      }, Estado del Pedido: ${status}, Duración del Pedido: ${differenceInMinutes(
        new Date(updatedAt),
        new Date(createdAt),
      )}min`,
    );
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handleOpenMoreInfo}>
      <Div
        bg="white"
        borderWidth={0.8}
        borderColor="primary"
        rounded="xl"
        p="lg"
        row>
        <Div justifyContent="center" alignItems="center" mr="lg">
          {/**rating */}
        </Div>
        <Div flex={1}>
          <Text fontSize="sm" fontWeight="500" color="primary">
            Calificación de 5 estrellas
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color="primary">
            {'No hay comentario.'}
          </Text>
          <Text fontSize="lg" fontWeight="500" color="primary">
            {timeAgoFormat(createdAt, 'es_PE')}
          </Text>
        </Div>
      </Div>
    </TouchableOpacity>
  );
};
