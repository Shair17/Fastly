import { FastifyInstance } from 'fastify';
import {
	Service,
	Initializer,
	FastifyInstanceToken,
	getInstanceByToken,
} from 'fastify-decorators';
import cloudinary from 'cloudinary';

@Service('CloudinaryServiceToken')
export class CloudinaryService {
	private readonly fastify =
		getInstanceByToken<FastifyInstance>(FastifyInstanceToken);

	@Initializer()
	init(): void {
		cloudinary.v2.config({
			cloud_name: this.fastify.config.CLOUDINARY_CLOUD_NAME,
			api_key: this.fastify.config.CLOUDINARY_API_KEY,
			api_secret: this.fastify.config.CLOUDINARY_API_SECRET,
		});
	}

	async upload(
		image: string,
		filename?: string
	): Promise<cloudinary.UploadApiResponse> {
		return cloudinary.v2.uploader.upload(image, {
			folder: 'avatars',
			filename_override: filename,
		});
	}
}
