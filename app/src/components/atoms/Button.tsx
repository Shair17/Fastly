import React, {FC} from 'react';
import {
  Button as MagnusButton,
  ButtonProps as MagnusButtonProps,
} from 'react-native-magnus';

export interface ButtonProps extends MagnusButtonProps {}

export const Button: FC<ButtonProps> = ({...rest}) => {
  return <MagnusButton bg="primary" rounded="md" {...rest} />;
};
