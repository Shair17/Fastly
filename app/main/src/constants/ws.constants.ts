import {isDev} from './environment.constants';

export const WS_URL = isDev
  ? 'ws://192.168.1.46:3000'
  : 'wss://api.fastly.delivery';
