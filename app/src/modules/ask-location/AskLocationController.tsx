import React, {FC} from 'react';
import {Div, Text} from 'react-native-magnus';
import {ContainerWithCredits} from '../../components/templates/ContainerWithCredits';
import {AskLocationScreenProps} from '../../navigation/screens/AskLocationScreen';
import {AskLocationHeader} from './AskLocationHeader';

export const AskLocationController: FC<AskLocationScreenProps> = () => {
  return (
    <ContainerWithCredits>
      <AskLocationHeader />
    </ContainerWithCredits>
  );
};
