import { useEffect, useState } from 'react';
import { useAuthStore } from '@fastly/stores/useAuthStore';
import { isValidToken } from '@fastly/utils/isValidToken';
import {
	isTokenExpired,
	clearAuthTokens,
} from '@fastly/services/refresh-token.service';

export const useIsAuthenticated = (): boolean => {
	const accessToken = useAuthStore((r) => r.accessToken);
	const refreshToken = useAuthStore((r) => r.refreshToken);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
		() => !!accessToken && !!refreshToken
	);

	useEffect(() => {
		if (!accessToken && !refreshToken) {
			setIsAuthenticated(false);
			return;
		}

		if (!isValidToken(accessToken) && !isValidToken(refreshToken)) {
			setIsAuthenticated(false);
			return;
		}

		if (isTokenExpired(refreshToken)) {
			clearAuthTokens();
			setIsAuthenticated(false);
			return;
		}

		setIsAuthenticated(!!accessToken && !!refreshToken);
	}, [accessToken, refreshToken]);

	return isAuthenticated;
};
