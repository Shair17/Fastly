import {FC} from 'react';
import {
  Button as MagnusButton,
  ButtonProps as MagnusButtonProps,
} from 'react-native-magnus';

interface ButtonProps extends MagnusButtonProps {}

export const Button: FC<ButtonProps> = () => {
  return <MagnusButton></MagnusButton>;
};
