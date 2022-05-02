import React, {FC} from 'react';
import {Button, ButtonProps} from '../../components/atoms/Button';

export const OnBoardingButton: FC<ButtonProps> = props => {
  return (
    <Button
      fontWeight="bold"
      fontSize="3xl"
      w={140}
      borderWidth={1}
      bg="transparent"
      borderColor="primary"
      color="primary"
      underlayColor="red100"
      {...props}
    />
  );
};

export const OnBoardingDoneButton: FC<ButtonProps> = props => {
  return (
    <Button block shadow="xs" fontWeight="bold" fontSize="3xl" {...props} />
  );
};
