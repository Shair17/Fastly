import React, {FC} from 'react';
import {
  Input as MagnusInput,
  InputProps as MagnusInputProps,
} from 'react-native-magnus';

export interface InputProps extends MagnusInputProps {}

export const Input: FC<InputProps> = props => {
  return (
    <MagnusInput
      bg="body"
      color="text"
      focusBorderColor="primary"
      fontWeight="500"
      {...props}
    />
  );
};
