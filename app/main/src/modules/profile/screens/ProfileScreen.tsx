import React, {useState} from 'react';
import {Platform} from 'react-native';
import {Avatar, Div, Text, Icon, useTheme} from 'react-native-magnus';
import {PullToRefresh} from '@fastly/components/templates/PullToRefresh';
import {ProfileItemSetting} from '@fastly/components/organisms/ProfileItemSetting';
import {LogOutButton} from '@fastly/components/molecules/LogOutButton';
import {CreatedByShair} from '@fastly/components/molecules/CreatedByShair';
import {useUserStore} from '@fastly/stores/useUserStore';
import {
  FASTLY_PP,
  FASTLY_TC,
  FASTLY_IOS,
  FASTLY_ANDROID,
} from '@fastly/constants/support';
import {openLink} from '@fastly/utils/openLink';
import {ProfileControllerHeader} from '../ProfileControllerHeader';

export const ProfileScreen: React.FC = ({navigation}: any) => {
  const {theme} = useTheme();
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
            <Div
              borderWidth={2}
              borderColor={theme.name === 'light' ? 'gray100' : 'gray900'}
              rounded="circle"
              mb="lg">
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

            <Div
              my="xl"
              h={1}
              bg={theme.name === 'light' ? 'gray100' : 'gray900'}
            />

            <ProfileItemSetting
              onPress={() => navigation.navigate('Theme')}
              iconName="color-palette"
              text="Tema"
            />

            <Div
              my="xl"
              h={1}
              bg={theme.name === 'light' ? 'gray100' : 'gray900'}
            />

            <ProfileItemSetting
              onPress={() =>
                openLink(
                  Platform.OS === 'ios' ? FASTLY_IOS : FASTLY_ANDROID,
                  false,
                )
              }
              iconName="star"
              text="Califícanos"
            />

            <Div my="md" />

            <ProfileItemSetting
              onPress={() => openLink(FASTLY_PP, false)}
              iconName="lock-closed"
              text="Política de Privacidad"
            />

            <Div my="md" />

            <ProfileItemSetting
              onPress={() => openLink(FASTLY_TC, false)}
              iconName="information-circle"
              text="Terminos y Condiciones"
            />

            <Div my="md" />

            <ProfileItemSetting
              onPress={() => navigation.navigate('Support')}
              iconName="help-circle"
              text="Soporte"
            />

            <Div
              my="xl"
              h={1}
              bg={theme.name === 'light' ? 'gray100' : 'gray900'}
            />

            <LogOutButton />
          </Div>

          <CreatedByShair />
        </Div>
      </PullToRefresh>
    </Div>
  );
};
