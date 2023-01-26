import {FastifyPluginAsync} from 'fastify';
import fp from 'fastify-plugin';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

declare module 'fastify' {
  interface FastifyInstance {
    mail: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
  }
}

const mail: FastifyPluginAsync = fp(async (app, options) => {
  const transporter = nodemailer.createTransport({
    host: app.config.MAILER_TRANSPORTER_HOST,
    port: +app.config.MAILER_TRANSPORTER_PORT,
    secure: app.config.MAILER_TRANSPORTER_SECURE,
    auth: {
      user: app.config.MAILER_TRANSPORTER_USER,
      pass: app.config.MAILER_TRANSPORTER_PASS,
    },
  });

  app.decorate('mail', transporter);

  // const isReady = await app.mail.verify();
  // if (isReady) app.log.info(`Mail transporter is ready.`);
  // else app.log.warn(`Mail transporter connection cannot be stablished.`);

  app.addHook('onClose', (app, done) => {
    transporter.close();
    done();
  });
});

export default mail;
