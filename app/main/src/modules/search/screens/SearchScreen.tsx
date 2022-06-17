import React, {FC, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Div, Text, Icon} from 'react-native-magnus';
import {Input} from '../../../components/atoms/Input';
import {ContainerWithKeyboardAvoidingView} from '../../../components/templates/ContainerWithKeyboardAvoidingView';
import {RecentSearches} from '../../../components/organisms/RecentSearches';
import {RNActivityIndicator} from '../../../components/atoms/RNActivityIndicator';
import {useRecentSearchesStore} from '../../../stores/useRecentSearchesStore';
import {useDebounce} from '../../../hooks/useDebounced';

interface Props {}

export const SearchScreen: FC<Props> = () => {
  const searches = useRecentSearchesStore(r => r.searches);
  const searchesExists = Object.keys(searches).length > 0;
  const [isLoading, setIsLoading] = useState(true);
  const [_search, setSearch] = useState<string>('');
  const [search] = useDebounce(_search, 1000);

  return (
    <ContainerWithKeyboardAvoidingView flexFull>
      <Div bg="body" flex={1}>
        <Div py="xl">
          <Div px="xl">
            <Input
              value={_search}
              onChangeText={setSearch}
              placeholder="Buscar..."
              fontSize="xl"
              autoCapitalize="none"
              autoFocus
              clearButtonMode="always"
              clearTextOnFocus
              returnKeyType="search"
              prefix={
                isLoading ? (
                  <RNActivityIndicator size={17} />
                ) : (
                  <Icon
                    fontFamily="Ionicons"
                    fontSize="xl"
                    name="search"
                    p={0}
                    m={0}
                  />
                )
              }
              suffix={
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => alert('clear')}>
                  <Icon fontFamily="Ionicons" name="close" fontSize="xl" />
                </TouchableOpacity>
              }
            />
          </Div>
          {/** Search Container */}
          <Div mt="lg">
            {searchesExists && <RecentSearches searches={searches} />}
          </Div>
        </Div>
      </Div>
    </ContainerWithKeyboardAvoidingView>
  );
};
