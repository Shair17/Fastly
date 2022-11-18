const {version: currentServerVersion} = require('../../package.json');
// const {version: currentAppVersion} = require('../../../app/main/package.json');
// ? INFO: Poner la versión de la app aquí en código, importarla desde la app no funcionará.
const currentAppVersion = '0.0.1';

export const MAX_USER_ADDRESSES = 10;

export const SHAIR_EMAIL = 'kskrises@gmail.com';
export const SHAIR_FACEBOOK_ID = '...';

const fallBackServerVersion = '1.0.0';
const fallBackAppVersion = '1.0.0';

export const serverHost = '0.0.0.0';
export const serverName = 'Fastly-Shair@Server-Root/Main';
export const serverVersion =
  (currentServerVersion as string) || fallBackServerVersion;

export const appDeveloper = 'Shair <hello@shair.dev>';
export const appName = 'Fastly Delivery Perú ⚡';
export const appVersion = (currentAppVersion as string) || fallBackAppVersion;

// V.x.x -> major updates
// x.V.x -> minor updates
// x.x.V -> patch updates
export const appUpdateNeeded =
  +serverVersion.split('.')[0] > +appVersion.split('.')[0];

export const appUpdateMessage =
  'Por favor actualiza Fastly Delivery para tener una mejor experiencia!';

export const defaultAvatarUri =
  'https://res.cloudinary.com/fastly-delivery-app-peru/image/upload/v1631005766/defaults/avatars/fastly_mwizrt.jpg';
