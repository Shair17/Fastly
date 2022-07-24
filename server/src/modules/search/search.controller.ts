import {Controller} from 'fastify-decorators';
import {SearchService} from './search.service';
import {} from './search.schema';

@Controller('/v1/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}
}
