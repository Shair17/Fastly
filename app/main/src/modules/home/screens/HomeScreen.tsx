import React, {FC, useState} from 'react';
import {Div} from 'react-native-magnus';
import {CreatedByShair} from '../../../components/molecules/CreatedByShair';
import {AdvertisementsCarousel} from '../../../components/organisms/AdvertisementsCarousel';
import {FeedCarousel} from '../../../components/organisms/FeedCarousel';
import {ServicesCarousel} from '../../../components/organisms/ServicesCarousel';
import {PullToRefresh} from '../../../components/templates/PullToRefresh';
import {HomeScreenProps} from '../../../navigation/screens/app/HomeStack';
import {useAddressesBottomSheetStore} from '../../../stores/useAddressesBottomSheetStore';
import {useUserAddresses} from '../../../stores/useUserAddresses';
import {data} from '../dummyData';
import {HomeControllerHeader} from '../HomeControllerHeader';

export const HomeScreen: FC<HomeScreenProps> = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const currentAddress = useUserAddresses(u => u.currentAddress);
  const setAddressesBottomSheetActive = useAddressesBottomSheetStore(
    a => a.setIsActive,
  );

  const goToSearch = () => {
    navigation.navigate('SearchStack');
  };

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  };

  const onSeeMore = () => {
    console.log('onSeeMore');
  };

  return (
    <Div flex={1} bg="body">
      <HomeControllerHeader
        currentAddress={currentAddress}
        openAddressesBottomSheet={() => setAddressesBottomSheetActive(true)}
        goToSearch={goToSearch}
      />
      <PullToRefresh refreshing={refreshing} onRefresh={onRefresh}>
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
      </PullToRefresh>
    </Div>
  );
};
