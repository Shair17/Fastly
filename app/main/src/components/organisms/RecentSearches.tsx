import React, {FC} from 'react';
import {TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import {Div, Text, Icon} from 'react-native-magnus';
import {useRecentSearchesStore} from '../../stores/useRecentSearchesStore';

interface RecentSearchItemProps {
  search: string;
}

const RecentSearchItem: FC<RecentSearchItemProps> = ({search}) => {
  return (
    <TouchableNativeFeedback>
      <Div flexDir="row" justifyContent="space-between" py="lg">
        <Text fontSize="lg" numberOfLines={1}>
          {search}
        </Text>
        <Icon fontFamily="Ionicons" fontSize="xl" name="search" />
      </Div>
    </TouchableNativeFeedback>
  );
};

interface Props {
  searches: string[];
}

export const RecentSearches: FC<Props> = ({searches}) => {
  const removeRecentSearches = useRecentSearchesStore(
    r => r.removeRecentSearches,
  );

  return (
    <Div>
      <Div flexDir="row" justifyContent="space-between" alignItems="center">
        <Text fontWeight="600" fontSize="lg">
          Búsquedas Recientes
        </Text>
        <TouchableOpacity activeOpacity={0.7} onPress={removeRecentSearches}>
          <Text fontWeight="700" fontSize="lg" color="primary">
            Limpiar
          </Text>
        </TouchableOpacity>
      </Div>
      <Div mt="lg">
        {searches.map((search, key) => (
          <RecentSearchItem key={key.toString()} search={search} />
        ))}
      </Div>
    </Div>
  );
};
