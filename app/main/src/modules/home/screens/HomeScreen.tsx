import React, {FC, Fragment, useEffect} from 'react';
import {Div} from 'react-native-magnus';
import {CreatedByShair} from '@fastly/components/molecules/CreatedByShair';
import {AdvertisementsCarousel} from '@fastly/components/organisms/AdvertisementsCarousel';
import {HomeStackProps} from '@fastly/navigation/stacks/home';
import {HomeContainer} from '../components/HomeContainer';
import useAxios from 'axios-hooks';
import {Greeting} from '../components/Greeting';
import {Categories} from '../components/Categories';
import {RecommendedForYou} from '../components/RecommendedForYou';
import {LatestProducts} from '../components/LatestProducts';
import {StoresFeed} from '../components/StoresFeed';
import {ProductsFeed} from '../components/ProductsFeed';
import {LatestStores} from '../components/LatestStores';
import {HomeLoadingSkeleton} from '../components/HomeLoadingSkeleton';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import type {Store, Product} from '@fastly/interfaces/app';

// Diseños:
// https://cdn.dribbble.com/users/4598139/screenshots/17049417/media/e9a82b8ee538bd025a9e1cd5dc5e2707.png
// https://freebiesui.com/wp-content/uploads/2019/07/foodybite-food-app-design-xd-768x7874.jpg
// https://www.uplabs.com/posts/food-delivery-app-5a404b5b-464c-4942-8d4c-d99b28f293bf
// https://assets.materialup.com/uploads/b336a97d-6858-4faf-bb4b-ad2c1b650e71/preview.png
// https://dribbble.com/shots/18919324-Mobile-App-Food-Delivery-10amDesignChallenge01
// https://cdn.dribbble.com/userupload/2833842/file/original-30232807776c2269bf2da459c7dec488.png?compress=1&resize=1504x1128
// https://dribbble.com/shots/19118642-Wareg-Food-Delivery-App
// https://cdn.dribbble.com/userupload/3124191/file/original-05058ed38fdd8f179f9dd53fffefe6da.png?compress=1&resize=2048x1536
// https://www.figma.com/file/jWPNWstA43DIQCmFiMS2Ae/Fooder-UI-Kit-(Community)?node-id=100%3A0
// https://www.figma.com/file/Il8k3FhvgjuGTAUbky3l5n/Food-delivery-app-Ui-kit-(Community)?node-id=0%3A1
// https://www.figma.com/file/QMaqtYz9TNJx9BqIt3wkCv/Food-App-Ui-Kit-v2-(Community)?node-id=0%3A1
// https://www.figma.com/file/9iQKuMuu0U49PtCYLNVitx/Pixel-True---Food-Delivery-UI-Kit?node-id=401%3A934
// https://www.figma.com/file/9iQKuMuu0U49PtCYLNVitx/Pixel-True---Food-Delivery-UI-Kit?node-id=401%3A934

type Image = string;
type AdType = 'link' | 'product' | 'store' | 'category';
type Carousel = {
  image: Image;
  type: AdType;
  metadata: {
    url?: string | null;
    entityId?: string | null;
    message?: string | null;
  };
};

export type Response = {
  carousel: Carousel[];
  recommended: Product[];
  productsJustAdded: Product[];
  storesJustAdded: Store[];
  stores: Store[];
  products: Product[];
};

export const HomeScreen: FC<HomeStackProps> = ({navigation, route}) => {
  const [{error, loading, data: feed}, refectchFeed] =
    useAxios<Response>('/feed');

  const onRefresh = () => {
    refectchFeed();
  };

  useEffect(() => {
    if (error) {
      Notifier.showNotification({
        title: 'Error inesperado',
        description: 'Ha ocurrido un error, vuelve en unos minutos por favor.',
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: 'error',
        },
      });
    }
  }, [error]);

  return (
    <HomeContainer
      goToSearch={() => navigation.navigate('SearchStack')}
      refreshing={loading}
      onRefresh={onRefresh}>
      <Div p="2xl">
        <Greeting />

        <Div my="lg" />

        {loading || error || !feed ? (
          <HomeLoadingSkeleton />
        ) : (
          <Fragment>
            <AdvertisementsCarousel
              data={feed.carousel}
              navigation={navigation}
            />

            <Div my="lg" />

            <Categories
              navigation={navigation}
              // onSeeMorePress={() =>
              //   // @ts-ignore
              //   navigation.navigate('HomeStack', {
              //     screen: 'Categories',
              //   })
              // }
            />

            <Div my="lg" />

            <RecommendedForYou
              navigation={navigation}
              data={feed.recommended}
            />

            <Div my="lg" />

            <LatestProducts
              navigation={navigation}
              data={feed.productsJustAdded}
            />

            <Div my="lg" />

            <LatestStores navigation={navigation} data={feed.storesJustAdded} />

            <Div my="lg" />

            <StoresFeed navigation={navigation} data={feed.stores} />

            <Div my="lg" />

            <ProductsFeed navigation={navigation} data={feed.products} />

            {/** Espacio para abajo */}
            <Div my="3xl" />

            <CreatedByShair bottom={10} />
          </Fragment>
        )}
      </Div>
    </HomeContainer>
  );
};
