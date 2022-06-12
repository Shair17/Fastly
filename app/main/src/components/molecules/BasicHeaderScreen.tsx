import React, {FC} from 'react';
import {Div, Text, Image} from 'react-native-magnus';

interface Props {}

const logoImage = require('../../assets/images/fastly@1000x1000.png');

export const BasicHeaderScreen: FC<Props> = () => {
  return (
    <Div justifyContent="center" alignItems="center" bg="body">
      <Div my="md" />

      <Div flexDir="row" justifyContent="center" alignItems="center">
        <Div
          bg="red100"
          w={30}
          h={30}
          rounded="circle"
          shadow="xs"
          justifyContent="center"
          alignItems="center">
          <Image w={20} h={20} source={logoImage} />
        </Div>

        <Div mx="xs" />

        <Text fontWeight="bold" fontSize="4xl" color="text">
          Fastly
        </Text>
      </Div>
    </Div>
  );
};
