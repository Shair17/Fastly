import Server from './server';
import qs from 'qs';
import {serverHost} from './constants/app';
import {isDev} from './constants/environment';

main();

async function main() {
  const startTime = Date.now();
  const app = await Server({
    logger: isDev,
    disableRequestLogging: isDev,
    ignoreTrailingSlash: true,
    querystringParser: str => qs.parse(str),
  });
  const endTime = Date.now();

  app.log.info(
    `Fastly server took ${Math.floor(endTime - startTime)}ms to start`,
  );
  app.log.info(`Developed by @Shair17 <hello@shair.dev>, https://shair.dev`);
  app.log.info(
    `Socket server is listening at ws${!isDev ? 's' : ''}://${serverHost}:${
      app.config.PORT
    }`,
  );

  await app.listen(+app.config.PORT, serverHost);
}
