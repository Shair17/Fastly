import { Service } from 'fastify-decorators';
import {
	serverName,
	serverVersion,
	appName,
	appVersion,
	appDeveloper,
	appUpdateNeeded,
} from './constants/app.constants';

@Service('AppServiceToken')
export class AppService {
	getApp() {
		return {
			serverName,
			serverVersion,
			appName,
			appVersion,
			appDeveloper,
			appUpdateNeeded,
			date: new Date().toISOString(),
		};
	}
}
