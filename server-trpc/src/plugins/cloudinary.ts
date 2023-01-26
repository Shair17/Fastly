import {FastifyPluginAsync} from 'fastify';
import fp from 'fastify-plugin';
import {v2 as cloudinary} from 'cloudinary';

declare module 'fastify' {
  interface FastifyInstance {
    cloudinary: typeof cloudinary;
  }
}

const cloudinaryPlugin: FastifyPluginAsync = fp(async (server, _) => {
  cloudinary.config({
    cloud_name: server.config.CLOUDINARY_CLOUD_NAME,
    api_key: server.config.CLOUDINARY_API_KEY,
    api_secret: server.config.CLOUDINARY_API_SECRET,
    secure: true,
  });

  const isReady = Object.keys(cloudinary.config()).length !== 0;

  if (isReady) server.log.info(`Cloudinary is ready to save assets.`);
  else server.log.warn(`Cloudinary connection cannot be stablished.`);

  server.decorate('cloudinary', cloudinary);
});

export default cloudinaryPlugin;
