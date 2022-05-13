import { Service } from 'fastify-decorators';
import { version as appVersion } from '../package.json';

@Service()
export class AppService {
	constructor() {}

	getApp(): Object {
		return {
			appName: 'Fastly Delivery ⚡',
			appVersion,
			appDeveloper: 'Shair <hello@shair.dev>',
			date: new Date().toISOString(),
		};
	}
}
