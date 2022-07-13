import React from 'react';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {ApplicationParams} from '@fastly/navigation/bottom-tabs/Root';
import {SearchController} from '@fastly/modules/search/SearchController';

export interface SearchStackProps
  extends BottomTabScreenProps<ApplicationParams, 'SearchStack'> {}

export const SearchStack: React.FC<SearchStackProps> = props => {
  return <SearchController {...props} />;
};
