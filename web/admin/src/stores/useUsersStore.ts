import create from 'zustand';
import { combine } from 'zustand/middleware';
import { User } from '../interfaces/appInterfaces';
import { http } from '../services/http.service';
import { isLoggedIn } from '../services/refresh-token.service';
import { showNotification } from '@mantine/notifications';

const getDefaultValues = async (): Promise<{ users: User[] }> => {
	const isAuthenticated = isLoggedIn();

	if (!isAuthenticated) {
		return {
			users: [],
		};
	}

	const response = await http.get<User[]>('/users');

	return {
		users: [...response.data],
	};
};

export const useUsersStore = create(
	combine(await getDefaultValues(), (set, get) => ({
		fetchUsers: async () => {
			const isAuthenticated = isLoggedIn();

			if (!isAuthenticated) {
				return {
					users: [] as User[],
				};
			}

			const response = await http.get<User[]>('/users');

			set({
				users: [...response.data],
			});
		},
	}))
);
