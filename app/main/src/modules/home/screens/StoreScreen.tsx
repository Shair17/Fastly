import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Div, Text} from 'react-native-magnus';
import {HomeStackParamList} from '../HomeController';

interface Props extends NativeStackScreenProps<HomeStackParamList, 'Store'> {}

export const StoreScreen: React.FC<Props> = () => (
  <Div flex={1} alignItems="center" justifyContent="center">
    <Text>CategoriesScreen</Text>
  </Div>
);
