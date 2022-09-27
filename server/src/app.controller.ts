import {Controller, GET} from 'fastify-decorators';
import {AppService} from './app.service';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GET('/v1')
  getApp() {
    return this.appService.getApp();
  }
}
