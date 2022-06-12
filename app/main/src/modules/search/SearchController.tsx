import React, {FC} from 'react';
import {SearchScreenProps} from '../../navigation/screens/app/SearchStack';
import {SearchScreen} from './screens/SearchScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const SearchStack = createNativeStackNavigator();

export const SearchController: FC<SearchScreenProps> = () => {
  return (
    <SearchStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Search">
      <SearchStack.Screen name="Search" component={SearchScreen} />
    </SearchStack.Navigator>
  );
};
