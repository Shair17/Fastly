import {Controller} from 'fastify-decorators';
import {FeedService} from './feed.service';

@Controller('/v1/feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}
}
