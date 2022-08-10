import React from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import {Div, Text} from 'react-native-magnus';
import {Rating} from 'react-native-ratings';
import {MyRanking} from '@fastly/interfaces/app';
import {format as timeAgoFormat} from 'timeago.js';
import format from 'date-fns/format';
import esLocale from 'date-fns/locale/es';

interface Props extends Omit<MyRanking, 'id'> {}

export const MyRankingItem: React.FC<Props> = ({createdAt, value, comment}) => {
  const handleOpenMoreInfo = () => {
    Alert.alert(
      `Tu Reseña: ${value}`,
      `${
        comment
          ? `Comentario de tu reseña: ${comment}`
          : `Tu reseña no tiene comentario`
      }, se hizo el ${format(new Date(createdAt), 'PPPP', {
        locale: esLocale,
      })}.`,
    );
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handleOpenMoreInfo}>
      <Div
        bg="white"
        borderWidth={0.8}
        borderColor="primary"
        rounded="xl"
        p="lg"
        row>
        <Div justifyContent="center" alignItems="center" mr="lg">
          <Rating
            showRating={false}
            ratingCount={1}
            readonly
            startingValue={value / 5}
          />
        </Div>
        <Div flex={1}>
          <Text fontSize="sm" fontWeight="500" color="primary">
            Calificación {value.toString()} de 5 estrellas
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color="primary">
            {comment ?? 'No hay comentario.'}
          </Text>
          <Text fontSize="lg" fontWeight="500" color="primary">
            {timeAgoFormat(createdAt, 'es_PE')}
          </Text>
        </Div>
      </Div>
    </TouchableOpacity>
  );
};
