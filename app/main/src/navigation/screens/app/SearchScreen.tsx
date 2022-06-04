import React, {FC} from 'react';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {ApplicationBottomTabParams} from '../../ApplicationBottomTab';
import {SearchController} from '../../../modules/search/SearchController';

export interface SearchScreenProps
  extends BottomTabScreenProps<ApplicationBottomTabParams, 'SearchScreen'> {}

export const SearchScreen: FC<SearchScreenProps> = props => {
  return <SearchController {...props} />;
};
