import create from 'zustand';
import {combine} from 'zustand/middleware';

type OrderHistoryBottomSheet = {
  isActive: boolean;
};

const getDefaultValues = (): OrderHistoryBottomSheet => {
  return {
    isActive: false,
  };
};

export const useOrderHistoryBottomSheetStore = create(
  combine(getDefaultValues(), (set, get) => ({
    setIsActive: (isActive: boolean) => {
      set({
        isActive,
      });
    },
  })),
);
