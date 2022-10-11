import React, {FC} from 'react';
import {Avatar, Div, Icon, Text} from 'react-native-magnus';
import {Button} from '@fastly/components/atoms/Button';
// import {AirbnbRating} from 'react-native-ratings';
import {Map, TMarker} from '@fastly/components/atoms/Map';
import {openLink} from '@fastly/utils/openLink';
import {useCountDown} from '@fastly/hooks/useCountDown';
import {useUserStore} from '@fastly/stores/useUserStore';

const markers: TMarker[] = [
  {
    title: 'Titulo',
    description: 'description',
    coordinate: {
      latitude: -7.2274927,
      longitude: -79.4293809,
    },
  },
  {
    title: 'Titulo 2',
    description: 'description 2',
    coordinate: {
      latitude: -7.2312625,
      longitude: -79.4167999,
    },
  },
];

interface Props {}

export const OngoingOrdersScreen: FC<Props> = props => {
  const name = useUserStore(u => u.name);
  const firstName = name.split(' ')[0];
  const countDown = useCountDown();
  const canBeCancelled = countDown > 0;

  return (
    <Div flex={1} bg="#FEE9DA">
      <Div flex={2}>
        <Map markers={markers} />
      </Div>
      <Div flex={2}>
        <Div row p="2xl">
          <Div flex={1} justifyContent="center" alignItems="center">
            <Div borderColor="primary" borderWidth={2} rounded="circle">
              <Avatar
                alignSelf="center"
                shadow="md"
                source={{
                  uri: 'https://res.cloudinary.com/fastly-delivery-app-peru/image/upload/v1656043607/avatars/n2kprfxi5baka3ipcirr.jpg',
                }}
              />
            </Div>
          </Div>
          <Div flex={3} justifyContent="center">
            <Text color="text" fontSize={10}>
              <Text fontWeight="bold" color="text">
                Jimmy Morales
              </Text>{' '}
              (Repartidor)
            </Text>
            <Div row mt="sm">
              <Icon name="star" color="secondary" fontFamily="AntDesign" />
              <Text fontWeight="500" ml="sm">
                5 <Text fontWeight="bold">•</Text> M2D929
              </Text>
            </Div>
          </Div>
          <Div flex={1} justifyContent="center" alignItems="center">
            <Button
              alignSelf="center"
              bg="primary"
              rounded="circle"
              onPress={() => openLink('tel:966017266', false)}>
              <Icon name="call" fontFamily="Ionicons" color="white" />
            </Button>
          </Div>
        </Div>

        <Div bg="body" flex={1} roundedTop={25} p="2xl">
          {canBeCancelled ? (
            <Div flex={2} row justifyContent="center" alignItems="center">
              <Div flex={1}>
                <Text color="red">
                  Hola{' '}
                  <Text color="red" fontWeight="500">
                    {firstName}
                  </Text>
                  , tienes{' '}
                  <Text color="red" fontWeight="bold">
                    {countDown}
                  </Text>{' '}
                  {countDown === 1 ? 'segundo' : 'segundos'} para cancelar tu
                  pedido.
                </Text>
              </Div>
              <Button
                alignSelf="center"
                p="sm"
                fontSize="xs"
                fontWeight="600"
                borderWidth={1}
                borderColor="primary"
                bg="transparent"
                color="primary"
                underlayColor="red50">
                Cancelar
              </Button>
            </Div>
          ) : (
            <Div flex={2}>
              <Text>Aquí dibujar el estado de la orden...</Text>
            </Div>
          )}

          <Div borderTopWidth={1} borderTopColor="gray100" my="lg" />

          <Div flex={2}>
            <Text color="primary" fontSize="lg" fontWeight="bold" mb="sm">
              Pizza Familiar
            </Text>

            <Text fontWeight="500" color="gray500">
              S/.20 <Text fontWeight="bold"> • </Text> 1{' '}
              {1 > 1 ? 'unidades' : 'unidad'} <Text fontWeight="bold"> • </Text>{' '}
              La vaca Lola
            </Text>
            <Text fontWeight="500" color="gray500" mt="xs">
              Calle Cajamarca 300 <Text fontWeight="bold"> • </Text> +51
              966107266
            </Text>
          </Div>
        </Div>
      </Div>
    </Div>
  );
};
