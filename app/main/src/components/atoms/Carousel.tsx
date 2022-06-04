import React, {FC} from 'react';
import Pinar, {Props as PinarProps} from 'pinar';

interface Props {
  height?: number;
  autoplayInterval?: number;
  children: any;
}

export const Carousel: FC<Props> = ({
  height = 150,
  autoplayInterval = 2000,
  children,
}) => {
  return (
    <Pinar
      bounces
      loop
      height={height}
      showsControls={false}
      autoplay
      autoplayInterval={autoplayInterval}
      showsDots={false}
      style={{borderRadius: 6, overflow: 'hidden'}}>
      {children}
    </Pinar>
  );
};
