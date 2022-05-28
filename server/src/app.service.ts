import { Service } from 'fastify-decorators';
import {
	serverName,
	serverVersion,
	appName,
	appVersion,
	appDeveloper,
} from './constants/app.constants';

@Service('AppServiceToken')
export class AppService {
	getApp(): Object {
		return {
			serverName,
			serverVersion,
			appName,
			appVersion,
			appDeveloper,
			date: new Date().toISOString(),
		};
	}
}
