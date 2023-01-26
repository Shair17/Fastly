import type {Server as IServer} from 'http';
import type {FastifyBaseLogger, FastifyServerOptions} from 'fastify';
import type {IncomingMessage, ServerResponse} from 'http';
import * as serverPkg from '../../package.json';
import * as appPkg from '../../../app/main/package.json';

type AppRecord = Record<string, string>;

interface Server {
  name: string;
  host: string;
  version: string;
  config: FastifyServerOptions<
    IServer<typeof IncomingMessage, typeof ServerResponse>,
    FastifyBaseLogger
  >;
}

export const server: Server = {
  name: 'Fastly',
  host: '0.0.0.0',
  version: serverPkg.version,
  config: {
    maxParamLength: 5000,
    logger: true,
    disableRequestLogging: true,
    ignoreTrailingSlash: true,
  },
};

export const MAX_USER_ADDRESSES = 10;
export const SHAIR_EMAIL = 'hello@shair.dev';
export const SHAIR_FACEBOOK_ID = '...';

export const developer = {
  name: 'Shair17',
  email: SHAIR_EMAIL,
  website: 'https://shair.dev',
};

const fallBackServerVersion = '1.0.0';
const fallBackAppVersion = '1.0.0';

export const serverName = 'Fastly-Shair@Server-Root/Main';
export const serverVersion =
  (appPkg.version as string) || fallBackServerVersion;

export const appDeveloper = 'Shair <hello@shair.dev>';
export const appName = 'Fastly Delivery Perú ⚡';
export const appVersion = (appPkg.version as string) || fallBackAppVersion;

// V.x.x -> major updates
// x.V.x -> minor updates
// x.x.V -> patch updates
export const appUpdateNeeded =
  +serverVersion.split('.')[0] > +appVersion.split('.')[0];

export const appUpdateMessage =
  'Por favor actualiza Fastly Delivery para tener una mejor experiencia!';

export const defaultAvatarUri =
  'https://res.cloudinary.com/fastly-delivery-app-peru/image/upload/v1631005766/defaults/avatars/fastly_mwizrt.jpg';
