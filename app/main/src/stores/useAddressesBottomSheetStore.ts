import create from 'zustand';
import {combine} from 'zustand/middleware';

type AddressesBottomSheetType = {
  isActive: boolean;
};

const getDefaultValues = (): AddressesBottomSheetType => {
  return {
    isActive: false,
  };
};

export const useAddressesBottomSheetStore = create(
  combine(getDefaultValues(), (set, get) => ({
    setIsActive: (isActive: boolean) => {
      set({
        isActive,
      });
    },
  })),
);
