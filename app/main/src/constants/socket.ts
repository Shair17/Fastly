import {isDev} from './environment';

export const SOCKET_URL = !isDev
  ? 'http://192.168.1.46:3000'
  : 'https://api.fastly.delivery';

// Events
