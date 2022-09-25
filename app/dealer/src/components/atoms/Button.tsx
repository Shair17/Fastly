import React, {FC} from 'react';
import {
  Button as MagnusButton,
  ButtonProps as MagnusButtonProps,
} from 'react-native-magnus';

export interface ButtonProps extends MagnusButtonProps {}

export const Button: FC<ButtonProps> = props => (
  <MagnusButton bg="primary" rounded="md" {...props} />
);
