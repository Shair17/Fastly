import React, {FC} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import {Div, Image, Text, Icon} from 'react-native-magnus';
import Pinar from 'pinar';
import {HomeScreenProps} from '../../navigation/screens/app/HomeScreen';

const logoImage = require('../../assets/images/fastly@1000x1000.png');

const Item = () => {
  return (
    <Div>
      <Div flexDir="row" mt="md">
        <Div rounded="circle" bg="gray200" h={40} w={40} />
        <Div ml="md" flex={1}>
          <Div mt="sm" rounded="lg" h={15} bg="gray200" />
          <Div mt="sm" w="80%" rounded="lg" h={15} bg="gray200" />
          <Div mt="sm" rounded="lg" h={15} bg="gray200" />
        </Div>
      </Div>
      <Div flexDir="row" mt="md">
        <Div h={20} w={20} rounded="lg" bg="gray200" />
        <Div h={20} w={20} rounded="lg" bg="gray200" ml="md" />
        <Div alignItems="flex-end" flex={1}>
          <Div h={20} w={100} bg="gray200" rounded="lg" />
        </Div>
      </Div>

      <Div my="xl" />
    </Div>
  );
};

const Header = ({goToSearch}: {goToSearch: () => void}) => {
  return (
    <Div bg="body" shadow="xs" h={50}>
      <Div
        row
        px="xl"
        flex={1}
        justifyContent="space-between"
        alignItems="center">
        <Div>
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
        </Div>
        <Div>
          <TouchableNativeFeedback
            onPress={() =>
              console.log(
                'Has presionado la dirección, aquí abrir el bottom sheet',
              )
            }>
            <Div row p="xs">
              <Icon
                fontFamily="Ionicons"
                name="location"
                fontSize={14}
                color="primary"
              />
              <Text fontWeight="bold" mx={2} color="text">
                Ricardo Palma 200
              </Text>
              <Icon
                fontFamily="Ionicons"
                name="chevron-down"
                fontSize={12}
                color="secondary"
              />
            </Div>
          </TouchableNativeFeedback>
        </Div>
        <Div>
          <TouchableOpacity activeOpacity={0.7} onPress={goToSearch}>
            <Icon fontFamily="Ionicons" name="search-outline" fontSize="4xl" />
          </TouchableOpacity>
        </Div>
      </Div>
    </Div>
  );
};

export const HomeController: FC<HomeScreenProps> = ({navigation}) => {
  const goToSearch = () => {
    navigation.navigate('SearchScreen');
  };

  return (
    <Div flex={1} bg="body">
      <Header goToSearch={goToSearch} />
      <ScrollView>
        <Div p="2xl">
          <Pinar
            bounces={false}
            loop
            height={150}
            showsControls={false}
            autoplay
            autoplayInterval={2000}
            mergeStyles
            showsDots
            dotsContainerStyle={{
              position: 'absolute',
              bottom: 10,
            }}
            activeDotStyle={{
              backgroundColor: '#fe554a',
            }}
            dotStyle={{
              backgroundColor: '#fee2e2',
            }}
            style={{borderRadius: 6, overflow: 'hidden'}}>
            <Div
              rounded="md"
              flex={1}
              justifyContent="center"
              alignItems="center"
              bg="yellow500">
              <Text>1</Text>
            </Div>
            <Div
              rounded="md"
              flex={1}
              justifyContent="center"
              alignItems="center"
              bg="lime500">
              <Text>2</Text>
            </Div>
            <Div
              rounded="md"
              flex={1}
              justifyContent="center"
              alignItems="center"
              bg="teal500">
              <Text>3</Text>
            </Div>
            <Div
              rounded="md"
              flex={1}
              justifyContent="center"
              alignItems="center"
              bg="violet500">
              <Text>4</Text>
            </Div>
            <Div
              rounded="md"
              flex={1}
              justifyContent="center"
              alignItems="center"
              bg="sky500">
              <Text>5</Text>
            </Div>
          </Pinar>
        </Div>
      </ScrollView>
    </Div>
  );
};
