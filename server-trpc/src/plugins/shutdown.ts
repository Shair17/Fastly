import {FastifyPluginAsync} from 'fastify';

const shutdownPlugin: FastifyPluginAsync = async (server, _) => {
  process.on('SIGINT', () => server.close());
  process.on('SIGTERM', () => server.close());
};

export default shutdownPlugin;
