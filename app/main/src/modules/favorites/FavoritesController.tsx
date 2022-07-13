import React, {useState} from 'react';
import {Div, Text} from 'react-native-magnus';
import {FavoritesStackProps} from '@fastly/navigation/stacks/favorites';
import {PullToRefresh} from '@fastly/components/templates/PullToRefresh';
import {FavoritesControllerHeader} from './FavoritesControllerHeader';
import {EmptyFavorites} from './EmptyFavorites';

export const FavoritesController: React.FC<FavoritesStackProps> = ({
  navigation,
}) => {
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
