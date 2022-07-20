import React from 'react';
import {Div, Text, Button} from 'react-native-magnus';
import {WelcomeScreenProps} from '@fastly/navigation/screens/WelcomeScreen';
import {openLink} from '@fastly/utils/openLink';
import {FASTLY_CONTACT} from '@fastly/constants';
import {MyBlur} from '@fastly/components/molecules/MyBlur';

export const WelcomeController: React.FC<WelcomeScreenProps> = ({
  navigation,
}) => {
  return (
    <Div flex={1} bg="body">
      <MyBlur />
      <Div flex={1} p="2xl">
        <Div flex={3}>
          <Text fontWeight="bold" color="text" fontSize={44}>
            Bienvenido a Fastly!
          </Text>
          <Text mt="lg" fontSize="lg" color="gray700">
            Con Fastly para Repartidores genera dinero extra realizando pedidos
            y recibes el 100% de tus propinas con nuestro sistema amigable para
            el repartidor. Inicia hoy mismo.
          </Text>
        </Div>
        <Div flex={3} justifyContent="flex-end">
          <Button
            fontWeight="600"
            block
            rounded="lg"
            fontSize="xl"
            h={55}
            bg="primary"
            onPress={() => navigation.navigate('SignUpScreen')}
            shadow="xs">
            Crear una Cuenta
          </Button>

          <Div my="md" />

          <Button
            fontWeight="600"
            block
            rounded="lg"
            fontSize="xl"
            h={55}
            bg="transparent"
            borderWidth={1}
            borderColor="primary"
            color="primary"
            underlayColor="red50"
            onPress={() => navigation.navigate('SignInScreen')}>
            Iniciar Sesión
          </Button>

          <Div my="xl" />

          <Div alignItems="center">
            <Text fontSize="xs" color="gray700">
              Si tienes alguna duda, no dudes en{' '}
              <Text
                color="primary"
                fontSize="xs"
                onPress={() => openLink(FASTLY_CONTACT)}>
                contactarnos
              </Text>
              .
            </Text>
          </Div>
        </Div>
      </Div>
    </Div>
  );
};
