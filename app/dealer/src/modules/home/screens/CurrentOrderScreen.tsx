import React, {FC, useCallback, useEffect} from 'react';
import {Div, Text} from 'react-native-magnus';
import {useFocusEffect} from '@react-navigation/native';
import {useSocketHasActiveOrders} from '@fastly/hooks/useSocketHasActiveOrders';
import {HomeStackParams} from '../HomeController';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

interface Props
  extends NativeStackScreenProps<HomeStackParams, 'CurrentOrderScreen'> {}

export const CurrentOrderScreen: FC<Props> = ({navigation}) => {
  const hasActiveOrders = useSocketHasActiveOrders();

  // Si por alguna razón, entra en esta pantalla sin que el ´dealer´ tenga ordenes activas, entonces devolver a la pantalla de ´home´
  // por alguna razón no funciona, debido a react navigation :/
  useFocusEffect(
    useCallback(() => {
      if (!hasActiveOrders) {
        navigation.replace('HomeScreen');
      }
    }, [navigation, hasActiveOrders]),
  );

  return (
    <Div>
      <Text>Aquí renderizar la orden activa actual.</Text>
    </Div>
  );
};
