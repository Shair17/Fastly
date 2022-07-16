import { FastifyPluginAsync } from 'fastify';

const MapRoutes: FastifyPluginAsync = async (server, options) => {
  let routes: string[] = [];

  for (let [path, route] of server.routes) {
    server.log.info(`Mapped {${path}, ${route[0].method}} route`);
    routes.push(`Mapped {${path}, ${route[0].method}} route`);
  }

  server.get('/routes', async () => routes);
};

export default MapRoutes;
