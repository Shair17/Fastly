import {Service} from 'fastify-decorators';
import {
  serverName,
  serverVersion,
  appName,
  appVersion,
  appDeveloper,
  appUpdateNeeded,
} from '@fastly/constants/app';
import {IOService} from '@fastly/shared/services/io.service';

@Service('AppServiceToken')
export class AppService {
  constructor(
    /**
     * No borrar, esto hace que el servicio de socketio
     * sea inyectado en la ruta inicial, solo tenerlo
     * declarado, no es necesario usarlo.
     */
    private readonly _: IOService,
  ) {}

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
