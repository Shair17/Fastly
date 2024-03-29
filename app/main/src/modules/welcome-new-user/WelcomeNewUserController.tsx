import React from 'react';
import {StatusBar} from 'react-native';
import {Div, Text} from 'react-native-magnus';
import * as Animatable from 'react-native-animatable';
import {WelcomeNewUserScreenProps} from '@fastly/navigation/screens/WelcomeNewUserScreen';
import {Button} from '@fastly/components/atoms/Button';
import {ContainerWithCredits} from '@fastly/components/templates/ContainerWithCredits';
import {useUserStore} from '@fastly/stores/useUserStore';

export const WelcomeNewUserController: React.FC<WelcomeNewUserScreenProps> = ({
  navigation,
}) => {
  const name = useUserStore(user => user.name);
  const firstName = name.split(' ')[0] ?? 'usuario';

  StatusBar.setTranslucent(false);

  const handleNext = () => {
    navigation.navigate('AskPersonalInformationScreen');
  };

  return (
    <ContainerWithCredits>
      <Div flex={1} bg="body">
        <Div p="2xl" flex={1}>
          <Div>
            <Animatable.View animation="fadeIn" delay={500} useNativeDriver>
              <Text fontWeight="bold" fontSize="6xl" color="text">
                Hola{' '}
                <Text fontWeight="bold" fontSize="6xl" color="secondary">
                  {firstName}
                </Text>
                , gracias por descargar{' '}
                <Text
                  fontWeight="bold"
                  fontSize="6xl"
                  bg="secondary"
                  color="white">
                  {' '}
                  Fastly{' '}
                </Text>
              </Text>
            </Animatable.View>

            <Div my="md" />

            <Animatable.View animation="bounceIn" delay={1500} useNativeDriver>
              <Text fontWeight="bold" fontSize="5xl" color="text">
                Parece que eres un nuevo usuario.
              </Text>
            </Animatable.View>

            <Div my="md" />

            <Animatable.View
              animation="bounceInRight"
              delay={3000}
              useNativeDriver>
              <Text fontWeight="bold" fontSize="5xl" color="text">
                A continuación, configurarás tu perfil.
              </Text>
            </Animatable.View>

            <Div my="md" />

            <Animatable.View
              animation="bounceInLeft"
              delay={4500}
              useNativeDriver>
              <Text fontWeight="bold" fontSize="5xl" color="text">
                Por favor llénalo con información verídica para brindarte un
                mejor servicio.
              </Text>
            </Animatable.View>
          </Div>

          <Div flex={1} justifyContent="flex-end">
            <Animatable.View animation="bounceIn" delay={5500} useNativeDriver>
              <Button
                block
                fontWeight="bold"
                fontSize="3xl"
                onPress={handleNext}>
                Continuar
              </Button>
            </Animatable.View>
          </Div>
        </Div>
      </Div>
    </ContainerWithCredits>
  );
};
