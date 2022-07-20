import {FastifyInstance} from 'fastify';
import {
  Service,
  getInstanceByToken,
  FastifyInstanceToken,
} from 'fastify-decorators';
import {AddressInfo} from 'net';

@Service()
export class AvatarService {
  private readonly fastify =
    getInstanceByToken<FastifyInstance>(FastifyInstanceToken);

  getDefaultAvatar() {
    const address = this.fastify.server.address();
    const fallBackUrl =
      'http://192.168.1.46:3000/assets/images/defaults/avatar.jpg';

    if (!address) return fallBackUrl;

    if (typeof address === 'string') console.log(address);

    const {address: _address, port} = address as AddressInfo;

    return _address === '0.0.0.0'
      ? fallBackUrl
      : `https://${address}:${port}/assets/images/defaults/avatar.jpg`;
  }
}
