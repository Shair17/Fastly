import React, {FC, Fragment} from 'react';
import {TouchableNativeFeedback} from 'react-native';
import Pinar from 'pinar';
import {Div, Text} from 'react-native-magnus';
import TextTicker from 'react-native-text-ticker';

interface Props {}

const services = [
  {
    items: [
      {
        itemService: [
          {
            title: 'Licores',
            img: require('../../assets/images/objects/liqueur.png'),
            bgColor: 'green100',
            borderColor: 'green300',
          },
          {
            title: 'Restaurantes',
            img: require('../../assets/images/objects/hamburger.png'),
            bgColor: 'yellow100',
            borderColor: 'yellow300',
          },
          {
            title: 'Mascotas',
            img: require('../../assets/images/objects/croquettes.png'),
            bgColor: 'slate100',
            borderColor: 'slate300',
          },
        ],
      },
      {
        itemService: [
          {
            title: 'Moda',
            img: require('../../assets/images/objects/fashion.png'),
            bgColor: 'sky100',
            borderColor: 'sky300',
          },
          {
            title: 'Tecnología',
            img: require('../../assets/images/objects/computer.png'),
            bgColor: 'cyan100',
            borderColor: 'cyan300',
          },
          {
            title: 'Juguetería',
            img: require('../../assets/images/objects/ball.png'),
            bgColor: 'amber100',
            borderColor: 'amber300',
          },
        ],
      },
    ],
  },
  {
    items: [
      {
        itemService: [
          {
            title: 'Farmacia',
            img: require('../../assets/images/objects/pharmacy.png'),
            bgColor: 'red100',
            borderColor: 'red300',
          },
          {
            title: 'Cuidado Personal',
            img: require('../../assets/images/objects/personal-care.png'),
            bgColor: 'amber100',
            borderColor: 'amber300',
          },
          {
            title: 'Maquillaje',
            img: require('../../assets/images/objects/make-up.png'),
            bgColor: 'pink100',
            borderColor: 'pink300',
          },
        ],
      },
      {
        itemService: [
          {
            title: 'Todo lo que quieras',
            img: require('../../assets/images/objects/everything-you-want.png'),
            bgColor: 'indigo100',
            borderColor: 'indigo300',
          },
          {
            title: 'Encargos',
            img: require('../../assets/images/objects/box-order.png'),
            bgColor: 'yellow100',
            borderColor: 'yellow300',
          },
          {
            isEmpty: true,
          },
        ],
      },
    ],
  },
];

export const ServicesCarousel: FC<Props> = ({}) => {
  return (
    <Div mb="lg">
      <Pinar
        bounces
        showsDots={false}
        showsVerticalScrollIndicator
        showsHorizontalScrollIndicator
        height={250}
        showsControls={false}>
        {services.map(({items}, key) => (
          <Div flex={1} key={key.toString()}>
            {items.map(({itemService}, key) => (
              <Div flex={3} row key={key.toString()}>
                {itemService.map(
                  ({title, bgColor, borderColor, img, isEmpty}, key) => (
                    <TouchableNativeFeedback
                      key={key.toString()}
                      disabled={isEmpty}>
                      <Div flex={2} justifyContent="center" alignItems="center">
                        {!isEmpty ? (
                          <Fragment>
                            <Div
                              w={70}
                              h={70}
                              bg={bgColor}
                              rounded="circle"
                              borderWidth={2}
                              borderColor={borderColor}>
                              <Div flex={1} bgImg={img} bgMode="contain" />
                            </Div>
                            <TextTicker
                              duration={5000}
                              loop
                              bounce
                              style={{marginTop: 4}}>
                              <Text fontWeight="600">{title}</Text>
                            </TextTicker>
                          </Fragment>
                        ) : null}
                      </Div>
                    </TouchableNativeFeedback>
                  ),
                )}
              </Div>
            ))}
          </Div>
        ))}
      </Pinar>
    </Div>
  );
};
