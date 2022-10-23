import React from 'react';
import {Text, Div} from 'react-native-magnus';
// import {useDate} from '@fastly/hooks/useDate';
import {useUserStore} from '@fastly/stores/useUserStore';

export const Greeting = () => {
  // const {greeting} = useDate();
  const name = useUserStore(user => user.name);
  const firstName = name.split(' ')[0] ?? 'Usuario';

  return (
    <Div>
      <Text fontSize="5xl" fontWeight="bold">
        Hola, {firstName} 👋
      </Text>
      <Text mt="xs" color="gray">
        ¿Qué pediremos hoy?
      </Text>
    </Div>
  );
};
