import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {configure} from 'axios-hooks';
import {http as axios} from '@fastly/services/http';
import {cache} from '@fastly/services/cache';

configure({axios, cache});

AppRegistry.registerComponent(appName, () => App);
