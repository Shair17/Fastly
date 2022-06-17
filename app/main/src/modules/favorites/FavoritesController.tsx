import React, {FC, useState} from 'react';
import {Div, Text} from 'react-native-magnus';
import {FavoritesControllerHeader} from './FavoritesControllerHeader';
import {FavoritesScreenProps} from '../../navigation/screens/app/FavoritesScreen';
import {PullToRefresh} from '../../components/templates/PullToRefresh';
import {EmptyFavorites} from './EmptyFavorites';

export const FavoritesController: FC<FavoritesScreenProps> = ({navigation}) => {
  const [hasFavorites, setHasFavorites] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const goToHome = () => {
    navigation.navigate('HomeStack');
  };

  return (
    <Div flex={1} bg="body">
      <FavoritesControllerHeader />
      {hasFavorites ? (
        <PullToRefresh refreshing={refreshing} onRefresh={onRefresh}>
          <Div bg="red" flex={1}>
            <Text>Hola</Text>
          </Div>
        </PullToRefresh>
      ) : (
        <EmptyFavorites goToHome={goToHome} />
      )}
    </Div>
  );
};
