import React, {FC} from 'react';
import {Div, Text} from 'react-native-magnus';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {ApplicationBottomTabParams} from '../../ApplicationBottomTab';

interface Props
  extends BottomTabScreenProps<ApplicationBottomTabParams, 'ProfileScreen'> {}

export const ProfileScreen: FC<Props> = () => {
  return (
    <Div>
      <Text>ProfileScreen</Text>
    </Div>
  );
};
