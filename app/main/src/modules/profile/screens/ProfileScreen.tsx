import React, {useState} from 'react';
import {Avatar, Div, Text, Icon} from 'react-native-magnus';
// import {Skeleton} from '../../components/atoms/Skeleton';
import {PullToRefresh} from '../../../components/templates/PullToRefresh';
import {useUserStore} from '../../../stores/useUserStore';
import {ProfileControllerHeader} from '../ProfileControllerHeader';
import {ProfileItemSetting} from '../../../components/organisms/ProfileItemSetting';
import {LogOutButton} from '../../../components/molecules/LogOutButton';
import {CreatedByShair} from '../../../components/molecules/CreatedByShair';
import {openLink} from '../../../utils/openLink';
import {FASTLY_PP, FASTLY_TC} from '../../../constants/support.constants';

/**
 * TODO
 * agregar cupones
 */

export const ProfileScreen = ({navigation}: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const avatarUrl = useUserStore(u => u.avatar);
  const name = useUserStore(u => u.name);
  const email = useUserStore(u => u.email);

  const fetchUser = useUserStore(s => s.fetchUser);

  const onRefresh = async () => {
    setRefreshing(true);

    await fetchUser();

    setRefreshing(false);
  };

  return (
    <Div flex={1} bg="body">
      <ProfileControllerHeader />
      <PullToRefresh refreshing={refreshing} onRefresh={onRefresh}>
        <Div p="2xl">
          <Div alignItems="center" mb="xl">
            <Div borderWidth={2} borderColor="gray100" rounded="circle" mb="lg">
              <Avatar size={120} source={{uri: avatarUrl}} />
            </Div>

            <Div alignItems="center">
              <Text fontWeight="bold" fontSize="4xl" color="text" mb="sm">
                {name}
              </Text>
              <Text fontSize="lg" color="gray500">
                {email}
              </Text>
            </Div>
          </Div>

          <Div>
            <ProfileItemSetting
              onPress={() => navigation.navigate('EditProfile')}
              iconName="person"
              text="Editar Perfil"
            />

            <Div my="md" />

            <ProfileItemSetting
              onPress={() => navigation.navigate('MyAddresses')}
              iconName="location"
              text="Direcciones"
            />

            <Div my="md" />

            <ProfileItemSetting
              onPress={() => navigation.navigate('MyOrders')}
              iconName="location"
              text="Pedidos"
            />

            <Div my="xl" h={1} bg="gray100" />

            <ProfileItemSetting
              onPress={() => navigation.navigate('Theme')}
              iconName="color-palette"
              text="Tema"
            />

            <Div my="xl" h={1} bg="gray100" />

            <ProfileItemSetting
              onPress={() => alert('calificanos')}
              iconName="star"
              text="Califícanos"
            />

            <Div my="md" />

            <ProfileItemSetting
              onPress={() => openLink(FASTLY_PP)}
              iconName="lock-closed"
              text="Política de Privacidad"
            />

            <Div my="md" />

            <ProfileItemSetting
              onPress={() => openLink(FASTLY_TC)}
              iconName="information-circle"
              text="Terminos y Condiciones"
            />

            <Div my="md" />

            <ProfileItemSetting
              onPress={() => navigation.navigate('Support')}
              iconName="help-circle"
              text="Soporte"
            />

            <Div my="xl" h={1} bg="gray100" />

            <LogOutButton />
          </Div>

          <CreatedByShair />
        </Div>
      </PullToRefresh>
    </Div>
  );
};
