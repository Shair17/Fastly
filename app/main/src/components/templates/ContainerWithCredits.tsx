import React, {FC} from 'react';
import {Div, DivProps} from 'react-native-magnus';
import {CreatedByShair} from '../molecules/CreatedByShair';

interface Props extends DivProps {
  showCredits?: boolean;
}

export const ContainerWithCredits: FC<Props> = ({
  children,
  showCredits = true,
  ...rest
}) => {
  return (
    <Div flex={1} bg="body" {...rest}>
      {children}
      {showCredits ? <CreatedByShair /> : null}
    </Div>
  );
};
