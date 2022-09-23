import React, {FC} from 'react';
import {Button, ButtonProps} from '../../components/atoms/Button';

export const OnBoardingButton: FC<ButtonProps> = props => {
  return (
    <Button
      fontWeight="bold"
      fontSize="3xl"
      w={140}
      borderWidth={1}
      borderColor="primary"
      bg="transparent"
      color="primary"
      underlayColor="red100"
      {...props}
    />
  );
};

export const OnBoardingDoneButton: FC<ButtonProps> = props => {
  return (
    <Button
      block
      shadow="xs"
      borderWidth={1}
      borderColor="primary"
      fontWeight="bold"
      fontSize="3xl"
      {...props}
    />
  );
};
