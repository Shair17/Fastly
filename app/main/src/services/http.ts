import Axios from 'axios';
import {API_BASE as baseURL} from '@fastly/constants/api';
import {TokenRefreshRequest, applyAuthTokenInterceptor} from './refresh-token';

export const http = Axios.create({baseURL});

const requestRefresh: TokenRefreshRequest = async (
  refreshToken: string,
): Promise<string> => {
  const response = await Axios.post(`${baseURL}/auth/facebook/refresh`, {
    refreshToken,
  });

  return response.data.accessToken;
};

applyAuthTokenInterceptor(http, {requestRefresh});
