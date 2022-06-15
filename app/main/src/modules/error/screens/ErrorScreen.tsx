import React from 'react';
import {StatusBar} from 'react-native';
import {Div, Text} from 'react-native-magnus';
import {useNetInfo} from '@react-native-community/netinfo';
import {BasicHeaderScreen} from '../../../components/molecules/BasicHeaderScreen';
import {useDimensions} from '../../../hooks/useDimensions';
import {ContainerWithCredits} from '../../../components/templates/ContainerWithCredits';

const astronautIllustration = require('../astronaut.png');

export const ErrorScreen = () => {
  const {
    window: {width},
  } = useDimensions();
  const title =
    useNetInfo().isConnected === false
      ? 'Por favor verifica tu conexión a internet.'
      : 'Ha ocurrido algo inesperado, vuelve en unos minutos por favor.';

  StatusBar.setTranslucent(false);
  // StatusBar.setBarStyle('dark-content');
  // StatusBar.setBackgroundColor('#fff');

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
      <Div flex={4} justifyContent="flex-end" px="2xl" alignItems="center">
        <Div w={width} h={380} bgImg={astronautIllustration} mb="xl" />
      </Div>
    </ContainerWithCredits>
  );
};
