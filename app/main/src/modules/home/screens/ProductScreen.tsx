import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Div, Text} from 'react-native-magnus';
import {HomeStackParamList} from '../HomeController';

interface Props extends NativeStackScreenProps<HomeStackParamList, 'Product'> {}

export const ProductScreen: React.FC<Props> = ({navigation, route}) => (
  <Div flex={1} alignItems="center" justifyContent="center">
    <Text>ProductScreen</Text>
  </Div>
);
