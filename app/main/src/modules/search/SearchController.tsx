import React, {FC} from 'react';
import {Div, Text} from 'react-native-magnus';
import {SearchScreenProps} from '../../navigation/screens/app/SearchScreen';

export const SearchController: FC<SearchScreenProps> = () => {
  return (
    <Div flex={1} bg="body">
      <Text>SearchScreen</Text>
    </Div>
  );
};
