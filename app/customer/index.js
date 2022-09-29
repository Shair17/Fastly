import {AppRegistry} from 'react-native';
import App from '@fastly/App';
import {name as appName} from './app.json';

import {configure} from 'axios-hooks';
import {cache} from '@fastly/services/cache';
import {http as axios} from '@fastly/services/http';

configure({axios, cache});

AppRegistry.registerComponent(appName, () => App);
