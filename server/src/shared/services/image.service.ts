import {FastifyInstance} from 'fastify';
import {
  FastifyInstanceToken,
  getInstanceByToken,
  Service,
} from 'fastify-decorators';
import fs from 'fs-extra';
import {AddressInfo} from 'net';
import {resolve} from 'path';

type TEntity =
  | 'admins'
  | 'customers'
  | 'dealers'
  | 'defaults'
  | 'products'
  | 'stores'
  | 'users';

@Service()
export class ImageService {
  private readonly fastify =
    getInstanceByToken<FastifyInstance>(FastifyInstanceToken);

  async saveJpgFromBase64(base64: string, entity: TEntity, name?: string) {
    let base64Image = base64.split(';base64,').pop();

    return this.saveTo(base64Image, entity, name);
  }

  private async saveTo(data: any, entity: TEntity, name?: string) {
    const extension = 'jpg';
    const fileName = `${name ?? 'img'}-${+new Date()}.${extension}`;
    const path = resolve(
      __dirname,
      `../../../public/assets/images/${entity}/${fileName}`,
    );

    await fs.writeFile(path, data, {encoding: 'base64'});

    return this.buildServerUri(`/assets/images/${entity}/${fileName}`);
  }

  private buildServerUri(uri: string) {
    const address = this.fastify.server.address();
    const fallBackUri = `http://192.168.1.46:3000${uri}`;

    if (!address) return fallBackUri;

    const {address: _address, port} = address as AddressInfo;

    return _address === '0.0.0.0'
      ? fallBackUri
      : `https://${address}:${port}${uri}`;
  }
}
