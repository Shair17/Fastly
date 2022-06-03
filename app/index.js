import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

import {configure} from 'axios-hooks';
import {cache} from './src/cache';
import {http as axios} from './src/services/http.service';

configure({axios, cache});

AppRegistry.registerComponent(appName, () => App);
