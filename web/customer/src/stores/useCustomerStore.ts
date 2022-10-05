import create from 'zustand';
import {combine} from 'zustand/middleware';
import {Customer} from '@fastly/interfaces/appInterfaces';
import {http} from '@fastly/services/http.service';
import {isLoggedIn} from '@fastly/services/refresh-token.service';

const getDefaultValues = async (): Promise<Customer> => {
  const isAuthenticated = isLoggedIn();

  if (!isAuthenticated) {
    return {} as Customer;
  }

  const response = await http.get<Customer>('/customers/me');

  return response.data;
};

export const useCustomerStore = create(
  combine(await getDefaultValues(), (set, get) => ({
    fetchAdmin: async () => {
      const isAuthenticated = isLoggedIn();

      if (!isAuthenticated) {
        return {} as Customer;
      }

      const response = await http.get<Customer>('/customers/me');

      set(response.data);
    },
    setCustomer: (customer: Customer) => set(customer),
  })),
);
