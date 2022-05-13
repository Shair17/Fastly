import { Service } from 'fastify-decorators';
import { appVersion } from './constants/app.constants';

@Service()
export class AppService {
	getApp(): Object {
		return {
			appName: 'Fastly Delivery ⚡',
			appVersion,
			appDeveloper: 'Shair <hello@shair.dev>',
			date: new Date().toISOString(),
		};
	}
}
