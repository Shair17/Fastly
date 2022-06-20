import create from 'zustand';
import { combine } from 'zustand/middleware';
import { Admin } from '../interfaces/appInterfaces';
import { http } from '../services/http.service';
import { isLoggedIn } from '../services/refresh-token.service';
import { showNotification } from '@mantine/notifications';

const getDefaultValues = async (): Promise<{ admins: Admin[] }> => {
	const isAuthenticated = isLoggedIn();

	if (!isAuthenticated) {
		return {
			admins: [],
		};
	}

	const response = await http.get<Admin[]>('/admins');

	return {
		admins: [...response.data],
	};
};

export const useAdminsStore = create(
	combine(await getDefaultValues(), (set, get) => ({
		fetchAdmins: async () => {
			const isAuthenticated = isLoggedIn();

			if (!isAuthenticated) {
				return {
					admins: [] as Admin[],
				};
			}

			const response = await http.get<Admin[]>('/admins');

			set({
				admins: [...response.data],
			});
		},
		removeAdmin: async (id: string, name: string) => {
			try {
				const response = await http.delete(`/admins/${id}`);

				if (response.status === 200) {
					set({
						admins: [...get().admins.filter((admin) => admin.id !== id)],
					});

					showNotification({
						title: 'Eliminado',
						message: `${name} eliminado correctamente`,
						color: 'green',
					});
				}
			} catch (error: any) {
				if (error?.response?.data.message) {
					showNotification({
						title: 'Error!',
						message: error.response.data.message,
						color: 'red',
					});
				}
			}
		},
	}))
);
