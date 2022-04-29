import {isDev} from './environment.constants';

export const API_BASE = isDev
  ? 'http://192.168.1.57:5000'
  : 'https://api.fastly.delivery';
