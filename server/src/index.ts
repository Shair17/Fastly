import Server from './server';
import qs from 'qs';
import {serverHost} from './constants/app';

async function main() {
  const startTime = Date.now();
  const app = await Server({
    logger: true,
    disableRequestLogging: true,
    ignoreTrailingSlash: true,
    querystringParser: str => qs.parse(str),
  });
  const endTime = Date.now();

  if (!!(require.main && module.children)) {
    // app.ready(async () => {
    app.log.info(
      `Fastly server took ${Math.floor(endTime - startTime)}ms to start`,
    );
    app.log.info(`Developed by @Shair17 <hello@shair.dev>, https://shair.dev`);

    await app.listen(+app.config.PORT, serverHost);

    // app.log.info(`Websocket server is listening at ws://${serverHost}:${app.config.PORT}`);
    // });
  }
}

main();
