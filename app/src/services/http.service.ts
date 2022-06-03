import Axios from 'axios';
import {API_BASE as baseURL} from '../constants/api.constants';
import {
  TokenRefreshRequest,
  applyAuthTokenInterceptor,
} from './refresh-token.service';

export const http = Axios.create({baseURL});

const requestRefresh: TokenRefreshRequest = async (
  refreshToken: string,
): Promise<string> => {
  console.log('refrescando el token');
  const response = await Axios.post(`${baseURL}/auth/facebook/refresh`, {
    refreshToken,
  });
  if (response.data.accessToken) {
    console.log('tenemos el token refrescado');
  }

  return response.data.accessToken;
};

applyAuthTokenInterceptor(http, {requestRefresh});
