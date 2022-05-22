import Axios from 'axios';
import {API_BASE as baseURL} from '../constants/api.constants';

export const http = Axios.create({baseURL});
