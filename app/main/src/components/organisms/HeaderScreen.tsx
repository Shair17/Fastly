import React, {FC} from 'react';
import {Div, Image, Text} from 'react-native-magnus';

const logoImage = require('../../assets/images/fastly@1000x1000.png');

interface Props {
  left?: React.ReactNode;
  middle?: React.ReactNode;
  right?: React.ReactNode;
}

export const HeaderScreen: FC<Props> = ({left, middle, right}) => {
  return (
    <Div bg="body" shadow="xs" h={50} zIndex={1}>
      <Div row px="xl" flex={1}>
        <Div flex={2} justifyContent="center" alignItems="flex-start">
          {left}
        </Div>
        <Div flex={2} justifyContent="center" alignItems="center">
          {middle ? (
            middle
          ) : (
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
          )}
        </Div>
        <Div flex={2} justifyContent="center" alignItems="flex-end">
          {right}
        </Div>
      </Div>
    </Div>
  );
};

export const HomeHeaderScreen: FC<Props> = ({left, middle, right}) => {
  return (
    <Div bg="body" shadow="xs" h={50} zIndex={1}>
      <Div row px="xl" flex={1}>
        <Div flex={1} justifyContent="center" alignItems="flex-start">
          {left}
        </Div>
        <Div flex={4} justifyContent="center" alignItems="center">
          {middle ? (
            middle
          ) : (
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
          )}
        </Div>
        <Div flex={1} justifyContent="center" alignItems="flex-end">
          {right}
        </Div>
      </Div>
    </Div>
  );
};
