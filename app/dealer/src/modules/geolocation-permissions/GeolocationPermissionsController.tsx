import React, {FC} from 'react';
import {StatusBar} from 'react-native';
import {Div, Text, Image} from 'react-native-magnus';
import {Button} from '@fastly/components/atoms/Button';
import {ContainerWithCredits} from '@fastly/components/templates/ContainerWithCredits';
import {GeolocationPermissionsScreenProps} from '@fastly/navigation/screens/GeolocationPermissionsScreen';
import {usePermissionsStore} from '@fastly/stores/usePermissionsStore';

const geolocationImage = require('../../assets/images/geolocation/bg@2.png');

export const GeolocationPermissionsController: FC<
  GeolocationPermissionsScreenProps
> = () => {
  const locationStatus = usePermissionsStore(s => s.locationStatus);
  const askLocationPermission = usePermissionsStore(
    s => s.askLocationPermission,
  );

  StatusBar.setTranslucent(false);

  return (
    <ContainerWithCredits>
      <Div flex={3}>
        <Image source={geolocationImage} flex={1} resizeMode="contain" />
      </Div>
      <Div flex={3}>
        <Div flex={3} px="2xl" alignItems="center">
          <Text fontSize="6xl" fontWeight="bold" color="text">
            Geolocalización
          </Text>

          <Div my="md" />

          <Text fontSize="lg" textAlign="center" color="textPrimary">
            Al permitir la geolocalización,{' '}
            <Text
              fontSize="lg"
              textAlign="center"
              color="textPrimary"
              fontWeight="600">
              Fastly
            </Text>{' '}
            podrás hacer uso de los servicios de Fastly.
          </Text>
        </Div>
        <Div flex={3} px="2xl">
          <Button
            block
            shadow="xs"
            fontWeight="bold"
            fontSize="3xl"
            onPress={askLocationPermission}>
            {locationStatus === 'blocked'
              ? 'Ir a la Configuración'
              : 'Habilitar'}
          </Button>

          <Div my="lg" />

          {locationStatus === 'blocked' && (
            <Text color="textPrimary" fontSize="sm" fontWeight="300">
              Al parecer tienes bloqueada la geolocalización en los permisos de
              la aplicación, por favor presiona el botón de arriba para ir a
              configuración.
            </Text>
          )}
        </Div>
      </Div>
    </ContainerWithCredits>
  );
};
