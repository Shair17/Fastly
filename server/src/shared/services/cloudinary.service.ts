import {Initializer, Service} from 'fastify-decorators';
import cloudinary from 'cloudinary';
import {ConfigService} from '../../config/config.service';
import type {OnModuleInit} from '../../interfaces/module';
import {LoggerService} from './logger.service';

type IFolder =
  | 'admins'
  | 'customers'
  | 'dealers'
  | 'users'
  | 'defaults'
  | 'products'
  | 'stores';

@Service('CloudinaryServiceToken')
export class CloudinaryService implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService,
  ) {}

  @Initializer()
  onModuleInit(): void {
    cloudinary.v2.config({
      cloud_name: this.configService.getOrThrow<string>(
        'CLOUDINARY_CLOUD_NAME',
      ),
      api_key: this.configService.getOrThrow<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.getOrThrow<string>(
        'CLOUDINARY_API_SECRET',
      ),
      secure: true,
    });

    const isReady = Object.keys(cloudinary.v2.config()).length !== 0;

    this.loggerService.info(
      isReady
        ? `Cloudinary Service is ready to save assets.`
        : `Cloudinary connection cannot be stablished.`,
    );
  }

  async upload(
    folder: IFolder,
    image: string,
    filename?: string,
  ): Promise<cloudinary.UploadApiResponse> {
    return cloudinary.v2.uploader.upload(image, {
      folder,
      filename_override: filename,
    });
  }

  async destroy(public_id: string) {
    return cloudinary.v2.uploader.destroy(public_id);
  }
}
