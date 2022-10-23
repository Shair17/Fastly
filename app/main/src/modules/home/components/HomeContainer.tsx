import React from 'react';
import {Div} from 'react-native-magnus';
import {PullToRefresh} from '@fastly/components/templates/PullToRefresh';
import {useUserAddresses} from '@fastly/stores/useUserAddresses';
import {useAddressesBottomSheetStore} from '@fastly/stores/useAddressesBottomSheetStore';
import {HomeControllerHeader} from '../HomeControllerHeader';

interface Props {
  refreshing: boolean;
  onRefresh: () => void;
  goToSearch: () => void;
}

export const HomeContainer: React.FC<Props> = ({
  goToSearch,
  onRefresh,
  refreshing,
  children,
}) => {
  const currentAddress = useUserAddresses(u => u.currentAddress);
  const setAddressesBottomSheetActive = useAddressesBottomSheetStore(
    a => a.setIsActive,
  );

  return (
    <Div flex={1} bg="body">
      <HomeControllerHeader
        currentAddress={currentAddress}
        openAddressesBottomSheet={() => setAddressesBottomSheetActive(true)}
        goToSearch={goToSearch}
      />
      <PullToRefresh refreshing={refreshing} onRefresh={onRefresh}>
        {children}
      </PullToRefresh>
    </Div>
  );
};
