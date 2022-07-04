import create from 'zustand';
import {combine} from 'zustand/middleware';
import {Alert} from 'react-native';
import {
  AddAddressResponseType,
  Address,
  MyAddressesResponse,
} from '../interfaces/appInterfaces';
import {http} from '../services/http.service';
import {isLoggedIn} from '../services/refresh-token.service';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {MAX_USER_ADDRESSES} from '../constants/app.constants';

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
    fetchUserAddresses: async () => {
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
      if (get().currentAddress.id === currentAddress.id) {
        return;
      }

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
    // TODO: guardar en el storage el id de la address seleccionado
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
          currentAddress: addresses[0],
          addresses,
        });
      }
    },
    addAddress: async (address: Partial<Address>) => {
      if (Object.keys(get().addresses).length >= MAX_USER_ADDRESSES) {
        Notifier.showNotification({
          title: 'Advertencia',
          description:
            'Alcanzaste el límite de direcciones, elimina una de tus direcciones existentes para agregar otra.',
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'warn',
          },
        });
        return;
      }

      const response = await http.post<AddAddressResponseType>(
        '/users/me/addresses',
        {
          name: address.name,
          street: address.street,
          instructions: address.instructions,
          zip: address.zip,
          city: address.city,
          tag: address.tag,
          latitude: address.latitude,
          longitude: address.longitude,
        },
      );

      set({
        addresses: response.data.addresses,
      });

      /**
      if (response.status === 200) {
        set({
          addresses: [...response.data.addresses],
        });
      } else if (response.status === 400) {
        Notifier.showNotification({
          title: 'Advertencia',
          description:
            'Alcanzaste el límite de direcciones, elimina una de tus direcciones existentes para agregar otra.',
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'warn',
          },
        });
      } else {
        Notifier.showNotification({
          title: 'Error',
          description: 'Ocurrió un error inesperado.',
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'error',
            backgroundColor: 'red',
          },
        });
      }*/
    },
    deleteAddress: (id: string) => {
      if (get().currentAddress.id === id) {
        Notifier.showNotification({
          title: 'Advertencia',
          description: 'No puedes borrar la dirección predeterminada.',
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'warn',
          },
        });
        return;
      }

      if (Object.keys(get().addresses).length <= 1) {
        Notifier.showNotification({
          title: 'Advertencia',
          description: 'No puedes borrar la única dirección que tienes.',
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'warn',
          },
        });
        return;
      }

      Alert.alert(
        'Eliminar dirección',
        '¿Estás seguro que quieres borrar esta dirección?',
        [
          {
            text: 'No',
            style: 'cancel',
          },
          {
            style: 'default',
            text: 'Sí, estoy seguro',
            onPress: async () => {
              const response = await http.delete(`/users/me/addresses/${id}`);

              set({
                addresses: [
                  ...get().addresses.filter(address => address.id !== id),
                ],
              });
            },
          },
        ],
        {cancelable: true},
      );
    },
  })),
);
