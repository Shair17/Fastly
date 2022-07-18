import React, {FC} from 'react';
import {ScrollView, RefreshControl} from 'react-native';
import {fastlyColors as colors} from '@fastly/theme';

interface Props {
  refreshing: boolean;
  onRefresh: () => void;
}

export const PullToRefresh: FC<Props> = ({children, refreshing, onRefresh}) => {
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[colors.primary, colors.secondary]}
        />
      }>
      {children}
    </ScrollView>
  );
};
