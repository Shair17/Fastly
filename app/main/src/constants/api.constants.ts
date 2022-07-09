import {isDev} from './environment.constants';

// http://192.168.1.46:3000/v1

export const API_BASE = isDev
  ? 'http://192.168.1.46:3000/v1'
  : 'https://api.fastly.delivery/v1';
