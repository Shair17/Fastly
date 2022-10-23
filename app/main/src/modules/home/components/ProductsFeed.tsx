import React from 'react';
import {Div, Text} from 'react-native-magnus';
import {SeeMore} from './SeeMore';
import {isFunction} from '@fastly/utils/isFunctions';

interface Props {
  onSeeMorePress?: () => void;
}

export const ProductsFeed: React.FC<Props> = ({onSeeMorePress}) => {
  return (
    <Div>
      <Div mb="sm" row alignItems="center" justifyContent="space-between">
        <Text fontSize="3xl" fontWeight="bold">
          Productos
        </Text>
        {isFunction(onSeeMorePress) ? (
          <SeeMore onPress={onSeeMorePress} />
        ) : null}
      </Div>
    </Div>
  );
};
