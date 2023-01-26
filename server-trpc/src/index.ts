import server from './server';
import {developer, server as serverConstants} from './constants/app';

server.log.info(
  `Developed by @${developer.name} <${developer.email}>, ${developer.website}`,
);

const startTime = Date.now();

server.ready(err => {
  if (err) throw err;

  const durationMs = Date.now() - startTime;
  server.log.info(
    `${serverConstants.name}@${
      serverConstants.version
    } server took ${Math.floor(durationMs)}ms to start`,
  );

  server.listen({
    port: +server.config.PORT,
    host: serverConstants.host,
  });
});
