import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import App from '@fastly/App';
import {name as appName} from './app.json';

import {configure} from 'axios-hooks';
import {http as axios} from '@fastly/services/http';
import {cache} from '@fastly/services/cache';
import {register} from 'timeago.js';
import {getDateLang} from '@fastly/utils/getDateLang';

register('es_PE', getDateLang);
configure({axios, cache});
AppRegistry.registerComponent(appName, () => App);
