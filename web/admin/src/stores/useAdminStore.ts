import create from 'zustand';
import {combine} from 'zustand/middleware';
import {Admin} from '@fastly/interfaces/appInterfaces';
import {http} from '@fastly/services/http.service';
import {isLoggedIn} from '@fastly/services/refresh-token.service';

const getDefaultValues = async (): Promise<Admin> => {
  const isAuthenticated = isLoggedIn();

  if (!isAuthenticated) {
    return {} as Admin;
  }

  const response = await http.get<Admin>('/admins/me');

  return response.data;
};

export const useAdminStore = create(
  combine(await getDefaultValues(), (set, get) => ({
    fetchAdmin: async () => {
      const isAuthenticated = isLoggedIn();

      if (!isAuthenticated) {
        return {} as Admin;
      }

      const response = await http.get<Admin>('/admins/me');

      set(response.data);
    },
    setAdmin: (admin: Admin) => set(admin),
  })),
);
