import create from 'zustand';
import {combine} from 'zustand/middleware';
import {Address, MyAddressesResponse} from '../interfaces/appInterfaces';
import {http} from '../services/http.service';
import {isLoggedIn} from '../services/refresh-token.service';

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
    fetchUser: async () => {
      const isAuthenticated = isLoggedIn();

      if (!isAuthenticated) {
        set({});
      }

      const response = await http.get<MyAddressesResponse>(
        '/users/me/addresses',
      );

      set({
        addresses: response.data.addresses,
      });
    },
    setCurrentAddress: (currentAddress: Address) => {
      if (get().currentAddress.id === currentAddress.id) return;

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
