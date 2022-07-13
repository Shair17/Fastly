import {isDev} from './environment';

export const API_BASE = isDev
  ? 'http://192.168.1.46:3000/v1'
  : 'https://api.fastly.delivery/v1';
