import React, {FC} from 'react';
import {Div, Text} from 'react-native-magnus';
import {openLink} from '@fastly/utils/openLink';
import {DEVELOPER_INSTAGRAM} from '@fastly/constants/developer';

interface Props {
  url?: string;
  bottom?: number;
  fontSize?: number;
}

export const CreatedByShair: FC<Props> = ({
  url = DEVELOPER_INSTAGRAM,
  bottom = 5,
  fontSize = 6,
}) => {
  return (
    <Div position="absolute" bottom={bottom} alignSelf="center">
      <Text fontSize={fontSize} color="gray400">
        Creado por{' '}
        <Text fontSize={fontSize} color="gray600" onPress={() => openLink(url)}>
          @shair.dev
        </Text>
      </Text>
    </Div>
  );
};
