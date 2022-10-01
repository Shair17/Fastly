import { showNotification } from '@mantine/notifications';
import Axios from 'axios';
import { BASE_URL as baseURL } from '../constants/api.constants';
import { useAuthStore } from '../stores/useAuthStore';
import {
	TokenRefreshRequest,
	applyAuthTokenInterceptor,
	isLoggedIn,
} from './refresh-token.service';

export const http = Axios.create({ baseURL });

http.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		const status = error?.response?.status;

		if (status === 401 || status === 422) {
			const isAuthenticated = isLoggedIn();

			if (isAuthenticated) {
				useAuthStore.getState().removeTokens();

				showNotification({
					title: 'Sesión Cerrada',
					message: 'Por favor vuelve a iniciar sesión.',
					color: 'red',
				});
			}
		}

		return Promise.reject(error);
	}
);

const requestRefresh: TokenRefreshRequest = async (
	refreshToken: string
): Promise<string> => {
	const response = await Axios.post(`${baseURL}/auth/admin/refresh`, {
		refreshToken,
	});

	return response.data.accessToken;
};

applyAuthTokenInterceptor(http, { requestRefresh });
