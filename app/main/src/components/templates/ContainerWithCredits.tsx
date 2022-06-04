import React, {FC} from 'react';
import {Div, DivProps} from 'react-native-magnus';
import {CreatedByShair} from '../molecules/CreatedByShair';

interface Props extends DivProps {}

export const ContainerWithCredits: FC<Props> = ({children, ...rest}) => {
  return (
    <Div flex={1} bg="body" {...rest}>
      {children}
      <CreatedByShair />
    </Div>
  );
};
