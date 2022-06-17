import React, {FC} from 'react';
import {StatusBar} from 'react-native';
import {Div, Text} from 'react-native-magnus';
import {useNetInfo} from '@react-native-community/netinfo';
import {BasicHeaderScreen} from '../../../components/molecules/BasicHeaderScreen';
import {useDimensions} from '../../../hooks/useDimensions';
import {ContainerWithCredits} from '../../../components/templates/ContainerWithCredits';
import {Button} from '../../../components/atoms/Button';
import {ErrorStackParmas} from '../ErrorController';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const astronautIllustration = require('../astronaut.png');

interface Props extends NativeStackScreenProps<ErrorStackParmas, 'Error'> {}

export const ErrorScreen: FC<Props> = ({navigation}) => {
  StatusBar.setTranslucent(false);
  // StatusBar.setBarStyle('dark-content');
  // StatusBar.setBackgroundColor('#fff');

  const {
    window: {width},
  } = useDimensions();
  const title =
    useNetInfo().isConnected === false
      ? 'Por favor verifica tu conexión a internet.'
      : 'Ha ocurrido algo inesperado, vuelve en unos minutos por favor.';

  const goToMinigame = () => {
    navigation.navigate('Minigame');
  };

  return (
    <ContainerWithCredits>
      <Div flex={2}>
        <BasicHeaderScreen />
        <Div p="2xl">
          <Text fontSize="6xl" fontWeight="bold" color="text">
            {title}
          </Text>
        </Div>
      </Div>
      <Div flex={2} p="2xl">
        <Button
          block
          fontWeight="bold"
          fontSize="3xl"
          borderWidth={1}
          bg="transparent"
          borderColor="primary"
          color="primary"
          underlayColor="red100"
          onPress={goToMinigame}>
          Jugar
        </Button>
      </Div>
      <Div flex={2} justifyContent="flex-end" px="2xl" alignItems="center">
        <Div w={width} h={380} bgImg={astronautIllustration} mb="xl" />
      </Div>
    </ContainerWithCredits>
  );
};
