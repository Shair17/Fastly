import React from 'react';
import {StatusBar} from 'react-native';
import {Div, Text} from 'react-native-magnus';
import {InactiveAccountScreenProps} from '@fastly/navigation/screens/InactiveAccountScreen';
import * as Animatable from 'react-native-animatable';
import {Button} from '@fastly/components/atoms/Button';
import {ContainerWithCredits} from '@fastly/components/templates/ContainerWithCredits';
import {useDealerStore} from '@fastly/stores/useDealerStore';
import useAxios from 'axios-hooks';
import {FASTLY_CONTACT} from '@fastly/constants/support';
import {openLink} from '@fastly/utils/openLink';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {useAuthStore} from '@fastly/stores/useAuthStore';

export const InactiveAccountController: React.FC<
  InactiveAccountScreenProps
> = () => {
  StatusBar.setTranslucent(false);
  const dealerId = useDealerStore(d => d.id);
  const [{loading}, executeRefreshDealerIsActive] = useAxios<{
    id: string;
    isActive: boolean;
  }>({url: `/dealers/is-active/${dealerId}`}, {manual: true});
  const name = useDealerStore(dealer => dealer.name);
  const firstName = name.split(' ')[0] ?? 'Repartidor';
  const setIsActive = useAuthStore(s => s.setIsActive);

  const handleRefreshDealerIsActive = () => {
    executeRefreshDealerIsActive()
      .then(response => {
        if (response.data.id === dealerId) {
          if (response.data.isActive) {
            setIsActive(response.data.isActive);
            Notifier.showNotification({
              title: 'Genial!',
              description: 'Tu cuenta ha sido activada.',
              Component: NotifierComponents.Alert,
              componentProps: {
                alertType: 'success',
              },
            });
          } else {
            Notifier.showNotification({
              title: 'Error',
              description: 'Tu cuenta aún no está activada.',
              Component: NotifierComponents.Alert,
              componentProps: {
                alertType: 'error',
              },
            });
          }
        } else {
          Notifier.showNotification({
            title: 'Error',
            description: 'Ha ocurrido un error al refrescar tus datos.',
            Component: NotifierComponents.Alert,
            componentProps: {
              alertType: 'error',
            },
          });
        }
      })
      .catch(error => {
        Notifier.showNotification({
          title: 'Error',
          description: error?.response?.data.message ?? 'Error inesperado',
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'error',
          },
        });
      });
  };

  return (
    <ContainerWithCredits>
      <Div flex={1} bg="body">
        <Div p="2xl" flex={1}>
          <Div>
            <Animatable.View animation="fadeIn" delay={500} useNativeDriver>
              <Text fontWeight="bold" fontSize="4xl" color="text">
                Hola{' '}
                <Text fontWeight="bold" fontSize="4xl" color="secondary">
                  {firstName}
                </Text>
                , gracias por usar{' '}
                <Text
                  fontWeight="bold"
                  fontSize="4xl"
                  bg="secondary"
                  color="white">
                  {' '}
                  Fastly para Repartidores{' '}
                </Text>
              </Text>
            </Animatable.View>

            <Div my="md" />

            <Animatable.View animation="bounceIn" delay={1500} useNativeDriver>
              <Text fontWeight="bold" fontSize="3xl" color="text">
                Tu cuenta está inactiva, espera a que un administrador active tu
                cuenta.
              </Text>
            </Animatable.View>

            <Div my="md" />

            <Animatable.View
              animation="bounceInRight"
              delay={3000}
              useNativeDriver>
              <Text fontWeight="bold" fontSize="3xl" color="text">
                Si este proceso demora mucho, puedes{' '}
                <Text
                  onPress={() => openLink(FASTLY_CONTACT)}
                  fontWeight="bold"
                  fontSize="4xl"
                  color="secondary">
                  contactarte
                </Text>{' '}
                con Fastly.
              </Text>
            </Animatable.View>

            <Div my="md" />

            <Animatable.View
              animation="bounceInLeft"
              delay={4500}
              useNativeDriver>
              <Text fontWeight="bold" fontSize="3xl" color="text">
                Para refrescar tu cuenta presiona en el botón de abajo.
              </Text>
            </Animatable.View>
          </Div>

          <Div flex={1} justifyContent="flex-end">
            <Animatable.View animation="bounceIn" delay={5500} useNativeDriver>
              <Button
                block
                fontWeight="bold"
                fontSize="3xl"
                h={50}
                loading={loading}
                onPress={handleRefreshDealerIsActive}>
                Refrescar
              </Button>
            </Animatable.View>
          </Div>
        </Div>
      </Div>
    </ContainerWithCredits>
  );
};
