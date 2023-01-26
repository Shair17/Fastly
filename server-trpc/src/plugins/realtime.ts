import {FastifyPluginAsync} from 'fastify';
import fp from 'fastify-plugin';
import {Server, ServerOptions} from 'socket.io';

declare module 'fastify' {
  interface FastifyInstance {
    io: Server;
  }
}

const realtime: FastifyPluginAsync<Partial<ServerOptions>> = fp(
  async (app, options) => {
    app.decorate('io', require('socket.io')(app.server, options));

    app.log.info('Socket server ready for listen events.');

    app.addHook('onClose', (app, done) => {
      app.io.close();
      done();
    });
  },
);

export default realtime;
