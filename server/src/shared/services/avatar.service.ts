import {Service} from 'fastify-decorators';
import {defaultAvatarUri} from '../../constants/app';

// TODO: Usar el SDK de cloudinary para obtener la uri del default avatar, por tamaño o dimensiones exactas.

@Service()
export class AvatarService {
  getDefaultAvatar() {
    return defaultAvatarUri;
  }
}
