import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SearchStackProps} from '@fastly/navigation/stacks/search';
import {SearchScreen} from './screens/SearchScreen';

const SearchStack = createNativeStackNavigator();

export const SearchController: React.FC<SearchStackProps> = () => {
  return (
    <SearchStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Search">
      <SearchStack.Screen name="Search" component={SearchScreen} />
    </SearchStack.Navigator>
  );
};
