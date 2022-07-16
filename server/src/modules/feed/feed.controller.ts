import { Controller } from 'fastify-decorators';
import { FeedService } from './feed.service';

@Controller('/feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}
}
