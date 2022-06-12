import React, {FC} from 'react';
import {ScrollView, RefreshControl} from 'react-native';
import {fastlyColors} from '../../theme/colors';

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
          colors={[fastlyColors.primary, fastlyColors.secondary]}
        />
      }>
      {children}
    </ScrollView>
  );
};
