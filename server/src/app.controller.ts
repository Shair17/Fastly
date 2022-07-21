import {Controller, GET} from 'fastify-decorators';
import {AppService} from './app.service';
import {IOService} from './shared/services/io.service';

@Controller('/')
export class AppController {
  constructor(
    private readonly appService: AppService,
    /**
     * No borrar, esto hace que el servicio de socketio
     * sea inyectado en la ruta inicial, solo tenerlo
     * declarado, no es necesario usarlo.
     */
    private readonly _: IOService,
  ) {}

  @GET('/v1')
  async getApp() {
    return this.appService.getApp();
  }
}
