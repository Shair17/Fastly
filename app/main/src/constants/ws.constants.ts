import {isDev} from './environment.constants';

export const WS_URL = isDev
  ? 'http://192.168.1.46:3000'
  : 'https://api.fastly.delivery';
