import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import {Div, Text} from 'react-native-magnus';
import {ReviewsStackProps} from '@fastly/navigation/stacks/reviews';
import useAxios from 'axios-hooks';
import {LoadingScreen} from '@fastly/navigation/screens';
import {AirbnbRating} from 'react-native-ratings';
import {MyRanking} from '@fastly/interfaces/app';
import {MyRankingItem} from '@fastly/components/organisms/MyRankingItem';
import {ActivityIndicator} from '@fastly/components/atoms/ActivityIndicator';
import {Button} from '@fastly/components/atoms/Button';

const MAX_REVIEWS_PER_REQUEST = 10;

export const ReviewsController: React.FC<ReviewsStackProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [noMoreReviews, setNoMoreReviews] = useState<boolean>(false);
  const [myRankings, setMyRankings] = useState<MyRanking[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const [
    {data: myRanking, loading: myRankingLoading, error: myRankingError},
    refetchMyRanking,
  ] = useAxios<number>('/dealers/me/ranking');
  const [
    {loading: myRankingsLoading, error: myRankingsError},
    fetchMyRankings,
  ] = useAxios<MyRanking[]>(
    `/dealers/me/rankings?take=${MAX_REVIEWS_PER_REQUEST}&skip=${skip}&orderBy=desc`,
    {manual: true},
  );

  const fetchItems = () => {
    setIsLoading(true);
    refetchMyRanking();
    fetchMyRankings()
      .then(response => {
        setMyRankings(prevState => {
          return [...prevState, ...response.data];
        });
        setIsLoading(false);
        setNoMoreReviews(response.data.length !== 10);
      })
      .finally(() => setIsLoading(false));
  };

  const fetchMore = () => {
    setSkip(skip + MAX_REVIEWS_PER_REQUEST);
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (myRankingLoading || myRankingsLoading) return <LoadingScreen />;

  if (myRankingError || myRankingsError) {
    return (
      <Div flex={1} p="2xl">
        <Text fontWeight="bold" fontSize="6xl">
          Oops, ha ocurrido un error :(
        </Text>
      </Div>
    );
  }

  return (
    <Div bg="body">
      <FlatList
        contentContainerStyle={{marginBottom: 10}}
        style={{
          width: '100%',
        }}
        data={myRankings}
        keyExtractor={item => item.id}
        renderItem={({item: {id, value, comment, createdAt, updatedAt}}) => (
          <Div mb="lg" mx="2xl">
            <MyRankingItem
              comment={comment}
              value={value}
              createdAt={createdAt}
              updatedAt={updatedAt}
            />
          </Div>
        )}
        ListHeaderComponent={() => {
          return (
            <Div p="2xl">
              <Div alignItems="center">
                <Text color="text" mb="lg" fontWeight="bold" fontSize="2xl">
                  Mi Promedio: {myRanking!.toString()}
                </Text>
                <AirbnbRating
                  showRating={false}
                  isDisabled
                  defaultRating={myRanking}
                  count={5}
                />
              </Div>
            </Div>
          );
        }}
        ListFooterComponent={() => {
          if (myRankings.length === 0) return null;

          return (
            <Div
              bg="body"
              flex={1}
              alignItems="center"
              justifyContent="center"
              mt="lg"
              mb="xl">
              {isLoading ? (
                <Div alignItems="center" justifyContent="center">
                  <ActivityIndicator />
                  <Text mt="sm">Cargando...</Text>
                </Div>
              ) : null}

              {noMoreReviews ? (
                <Text fontWeight="600" fontSize="lg">
                  Haz llegado al final.
                </Text>
              ) : null}
            </Div>
          );
        }}
        ListEmptyComponent={() => {
          return (
            <Div flex={1} px="2xl">
              <Text fontWeight="bold" fontSize="xl">
                Aún no tienes reseñas disponibles.
              </Text>
              <Button
                mt="xl"
                fontWeight="600"
                block
                loading={isLoading}
                onPress={fetchItems}>
                Recargar
              </Button>
            </Div>
          );
        }}
        onEndReachedThreshold={0.2}
        onEndReached={fetchMore}
      />
    </Div>
  );
};
