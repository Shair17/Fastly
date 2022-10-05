import {isDev} from '@fastly/utils/isDev';

export const BASE_URL = isDev
  ? 'http://localhost:3000/v1'
  : 'https://api.fastly.delivery/v1';
