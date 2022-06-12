import React from 'react';
import {Icon} from 'react-native-magnus';
import {useAuthStore} from '../../stores/useAuthStore';
import {Button} from '../atoms/Button';

export const LogOutButton = () => {
  const logOut = useAuthStore(u => u.removeTokens);

  return (
    <Button
      block
      bg="white"
      fontWeight="600"
      borderWidth={1}
      rounded="xl"
      borderColor="red500"
      color="red500"
      underlayColor="red100"
      onPress={logOut}
      prefix={
        <Icon
          fontFamily="Ionicons"
          name="log-out-outline"
          mr="sm"
          fontSize="xl"
          color="red500"
        />
      }>
      Cerrar Sesión
    </Button>
  );
};
