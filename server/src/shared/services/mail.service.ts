import { FastifyInstance } from 'fastify';
import {
	Service,
	Initializer,
	getInstanceByToken,
	FastifyInstanceToken,
} from 'fastify-decorators';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import internal from 'stream';

@Service('MailServiceToken')
export class MailService {
	private readonly nodemailer: typeof nodemailer = nodemailer;
	private readonly fastify =
		getInstanceByToken<FastifyInstance>(FastifyInstanceToken);

	private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

	@Initializer()
	init(): void {
		this.transporter = this.nodemailer.createTransport({
			host: this.fastify.config.MAILER_TRANSPORTER_HOST,
			port: +this.fastify.config.MAILER_TRANSPORTER_PORT,
			secure: this.fastify.config.MAILER_TRANSPORTER_SECURE,
			auth: {
				user: this.fastify.config.MAILER_TRANSPORTER_USER,
				pass: this.fastify.config.MAILER_TRANSPORTER_PASS,
			},
		});
	}

	async sendEmail({
		from,
		to,
		subject,
		html,
	}: {
		from: string | Mail.Address;
		to: string | Mail.Address | (string | Mail.Address)[];
		subject: string;
		html: string | Buffer | internal.Readable | Mail.AttachmentLike;
	}) {
		return this.transporter.sendMail({
			from,
			to,
			subject,
			html,
		});
	}
}
