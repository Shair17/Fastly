import React, {FC} from 'react';
import {StatusBar} from 'react-native';
import {Div, Text} from 'react-native-magnus';
import {HeaderScreen} from '../../components/molecules/HeaderScreen';
import {useDimensions} from '../../hooks/useDimensions';
import {ContainerWithCredits} from '../../components/templates/ContainerWithCredits';

interface Props {}

const offlineAstronautIllustration = require('../../assets/images/offline/astronaut.png');

export const OfflineScreen: FC<Props> = () => {
  const {
    window: {width},
  } = useDimensions();

  StatusBar.setTranslucent(false);
  StatusBar.setBarStyle('dark-content');
  StatusBar.setBackgroundColor('#fff');

  // useBackHandler(() => true);

  return (
    <ContainerWithCredits>
      <Div flex={2}>
        <HeaderScreen />
        <Div p="2xl">
          <Text fontSize="6xl" fontWeight="bold">
            Por favor, comprueba tu conexión a internet.
          </Text>
        </Div>
      </Div>
      <Div flex={4} justifyContent="flex-end" px="2xl" alignItems="center">
        <Div w={width} h={380} bgImg={offlineAstronautIllustration} mb="xl" />
      </Div>
    </ContainerWithCredits>
  );
};
