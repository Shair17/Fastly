import React, {FC} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import {Div, Image, Text, Icon} from 'react-native-magnus';
import {HomeScreenProps} from '../../navigation/screens/app/HomeScreen';
import {FeedCarousel} from '../../components/organisms/FeedCarousel';
import {data} from './dummyData';
import {Alert} from 'react-native';
import {AdvertisementsCarousel} from '../../components/organisms/AdvertisementsCarousel';
import {CreatedByShair} from '../../components/molecules/CreatedByShair';
import {ServicesCarousel} from '../../components/organisms/ServicesCarousel';
import TextTicker from 'react-native-text-ticker';

const logoImage = require('../../assets/images/fastly@1000x1000.png');

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
              <TextTicker
                duration={5000}
                loop
                bounce
                style={{width: 130, marginHorizontal: 4}}>
                <Text fontWeight="bold" color="text">
                  Ricardo Palma 200, La Libertad, Perú
                </Text>
              </TextTicker>

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
            <Icon
              fontFamily="Ionicons"
              name="search-outline"
              color="text"
              fontSize="4xl"
            />
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

  const onSeeMore = () => {
    Alert.alert('jijijiji');
  };

  return (
    <Div flex={1} bg="body">
      <Header goToSearch={goToSearch} />
      <ScrollView>
        <Div p="2xl">
          <AdvertisementsCarousel data={data} />

          <Div my="lg" />

          <ServicesCarousel />

          <Div my="lg" />

          <Div>
            <FeedCarousel title="Categorías 🏷️" onSeeMore={onSeeMore} />
          </Div>

          <Div my="lg" />

          <Div>
            <FeedCarousel title="Restaurantes 🍔" onSeeMore={onSeeMore} />
          </Div>

          <Div my="lg" />

          <Div>
            <FeedCarousel title="Popular 🔥" onSeeMore={onSeeMore} />
          </Div>

          <Div my="lg" />

          <CreatedByShair bottom={10} />
        </Div>
      </ScrollView>
    </Div>
  );
};
