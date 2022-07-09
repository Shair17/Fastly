import io from 'socket.io-client';
import {WS_URL} from '../constants/ws.constants';

export const socket = io(WS_URL, {
  transports: ['websocket'],
  autoConnect: true,
  forceNew: true,
});
