import React, {FC} from 'react';
import {Overlay, Text} from 'react-native-magnus';
import {ActivityIndicator} from '../atoms/ActivityIndicator';

interface Props {
  overlayVisible: boolean;
  text?: string;
}

export const OverlayLoading: FC<Props> = ({
  overlayVisible,
  text = 'Cargando...',
}) => {
  return (
    <Overlay visible={overlayVisible} alignItems="center" p="xl">
      <ActivityIndicator />
      <Text mt="md" color="text">
        {text}
      </Text>
    </Overlay>
  );
};
