import React, {FC} from 'react';
import {Div} from 'react-native-magnus';
import {Carousel} from '../atoms/Carousel';

interface Props {
  data: {image: any}[];
}

export const AdvertisementsCarousel: FC<Props> = ({data}) => {
  return (
    <Div>
      <Carousel>
        {data.map(({image}, key) => (
          <Div key={key.toString()} flex={1} bgMode="cover" bgImg={image} />
        ))}
      </Carousel>
    </Div>
  );
};
