const {version: currentServerVersion} = require('../../package.json');
const {version: currentAppVersion} = require('../../../app/main/package.json');

export const MAX_USER_ADDRESSES = 10;

export const SHAIR_EMAIL = 'hi@shair.dev';
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
