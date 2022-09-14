import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Div, Text, Icon, Avatar, Badge} from 'react-native-magnus';
import {useDealerStore} from '@fastly/stores/useDealerStore';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {useSocketStore} from '@fastly/stores/useSocketStore';
import {getVehicle} from '@fastly/utils/getVehicle';
import {useAuthStore} from '@fastly/stores/useAuthStore';

export const CustomDrawer: React.FC<DrawerContentComponentProps> = props => {
  const fullName = useDealerStore(s => s.name);
  const dealerIsOnline = useSocketStore(s => s.dealerIsOnline);
  const socket = useSocketStore(s => s.socket);
  const socketOnline = useSocketStore(s => s.online);
  const setDealerIsOnline = useSocketStore(s => s.setDealerIsOnline);
  const email = useDealerStore(s => s.email);
  const vehicle = useDealerStore(s => s.vehicle);
  const name = `${fullName.split(' ')[0]} ${fullName.split(' ')[1]}`;
  const avatar = useDealerStore(s => s.avatar);
  const removeTokens = useAuthStore(u => u.removeTokens);
  const logOutFromFastly = useAuthStore(u => u.logOutFromFastly);
  const available = socketOnline && dealerIsOnline;

  const logOut = async () => {
    setDealerIsOnline(false);
    socket?.emit('SET_DEALER_AVAILABLE', false);
    socket?.disconnect();
    await logOutFromFastly();
    removeTokens();
  };

  return (
    <Div flex={1}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#790E2B'}}>
        <Div py="xl" px={20}>
          <Div flexDir="row" alignItems="center">
            <Badge bg={available ? 'green500' : 'red500'} w={12} h={12}>
              <Avatar source={{uri: avatar}} />
            </Badge>

            <Div ml="lg">
              <Text color="#fff" fontWeight="bold" fontSize="xl">
                {name}
              </Text>
              <Text color="#fff" fontSize="xs">
                {email}
              </Text>
            </Div>
          </Div>

          <Div flexDir="column" mt="md">
            <Text color="#fff" fontWeight="500">
              Vehículo: {getVehicle(vehicle)}
            </Text>
            <Text color="#fff" fontWeight="500">
              Disponible:{' '}
              {available ? 'Sí' : !socketOnline ? 'Reconectando...' : 'No'}
            </Text>
          </Div>
        </Div>
        <Div flex={1} bg="#fff" pt={10}>
          <DrawerItemList {...props} />
        </Div>
      </DrawerContentScrollView>

      <Div py="xl" px={20} borderTopWidth={1} borderTopColor="#ccc">
        <TouchableOpacity
          onPress={() => {}}
          activeOpacity={0.8}
          style={{paddingVertical: 20}}>
          <Div flexDir="row" alignItems="center">
            <Icon
              fontFamily="Ionicons"
              fontSize={24}
              name="share-social-outline"
            />
            <Text fontSize={16} fontWeight="500" ml={15}>
              Compartir
            </Text>
          </Div>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={logOut}
          activeOpacity={0.8}
          style={{paddingVertical: 20}}>
          <Div flexDir="row" alignItems="center">
            <Icon fontFamily="Ionicons" name="exit-outline" fontSize={24} />
            <Text fontSize={16} fontWeight="500" ml={15}>
              Cerrar Sesión
            </Text>
          </Div>
        </TouchableOpacity>
      </Div>
    </Div>
  );
};
