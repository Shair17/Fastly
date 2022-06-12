import create from 'zustand';
import {combine} from 'zustand/middleware';
import {Address} from '../interfaces/appInterfaces';

type UserAddressesType = {
  currentAddress: Address;
  addresses: Address[];
};

const getDefaultValues = (): UserAddressesType => {
  return {
    currentAddress: {} as Address,
    addresses: [] as Address[],
  };
};

export const useUserAddresses = create(
  combine(getDefaultValues(), (set, get) => ({
    setCurrentAddress: (currentAddress: Address) => {
      set({
        currentAddress,
      });
    },
    setAddress: (address: Address) => {
      if (Object.keys(get().currentAddress).length === 0) {
        set({
          currentAddress: address,
          addresses: [address],
        });
      } else {
        set({
          addresses: [address],
        });
      }
    },
    setAddresses: (addresses: Address[]) => {
      if (
        addresses.length === 1 &&
        Object.keys(get().currentAddress).length === 0
      ) {
        set({
          currentAddress: addresses[0],
          addresses: addresses,
        });
      } else {
        set({
          addresses,
        });
      }
    },
  })),
);
