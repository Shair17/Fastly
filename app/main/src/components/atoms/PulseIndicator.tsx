import React, {FC} from 'react';
import {ViewProps} from 'react-native';
import {useTheme} from 'react-native-magnus';
import {Pulse} from 'react-native-animated-spinkit';

interface PulseIndicatorProps extends ViewProps {
  size?: number;
  color?: string;
  animating?: boolean;
  hidesWhenStopped?: boolean;
}

export const PulseIndicator: FC<PulseIndicatorProps> = props => {
  const {theme} = useTheme();

  return <Pulse color={theme.colors?.primary} {...props} />;
};
