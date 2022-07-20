import {Service} from 'fastify-decorators';
import {
  serverName,
  serverVersion,
  appName,
  appVersion,
  appDeveloper,
  appUpdateNeeded,
} from '@fastly/constants/app';

@Service('AppServiceToken')
export class AppService {
  async getApp() {
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
