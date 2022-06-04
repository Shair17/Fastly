import React, {FC} from 'react';
import {StatusBar} from 'react-native';
import {Div, Text} from 'react-native-magnus';
import {HeaderScreen} from '../../components/molecules/HeaderScreen';
import {useDimensions} from '../../hooks/useDimensions';
import {ContainerWithCredits} from '../../components/templates/ContainerWithCredits';
import {useBackHandler} from '../../hooks/useBackHandler';

interface Props {
  backHandler?: boolean;
  // Por favor, comprueba tu conexión a internet.
  title?: string;
}

const astronautIllustration = require('./astronaut.png');

export const ErrorScreen: FC<Props> = ({
  backHandler = false,
  title = 'Ha ocurrido algo inesperado, vuelve en unos minutos por favor.',
}) => {
  const {
    window: {width},
  } = useDimensions();

  StatusBar.setTranslucent(false);
  StatusBar.setBarStyle('dark-content');
  StatusBar.setBackgroundColor('#fff');

  if (backHandler) {
    useBackHandler(() => true);
  }

  return (
    <ContainerWithCredits>
      <Div flex={2}>
        <HeaderScreen />
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
