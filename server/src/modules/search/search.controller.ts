import {Controller} from 'fastify-decorators';
import {SearchService} from './search.service';
import {} from './search.schema';

// TODO: Definitivamente tengo que acabar este modulo con controlador, servicio y schema

@Controller('/v1/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}
}
