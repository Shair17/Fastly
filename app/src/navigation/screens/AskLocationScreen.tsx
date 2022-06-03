import React, {FC} from 'react';
import {AskLocationController} from '../../modules/ask-location/AskLocationController';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../RootNavigation.type';

export interface AskLocationScreenProps
  extends NativeStackScreenProps<RootStackParams, 'AskLocationScreen'> {}

export const AskLocationScreen: FC<AskLocationScreenProps> = props => {
  return <AskLocationController {...props} />;
};
