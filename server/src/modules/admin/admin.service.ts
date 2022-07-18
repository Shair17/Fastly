import {Service} from 'fastify-decorators';
import {Unauthorized, BadRequest, NotFound} from 'http-errors';
import {DatabaseService} from '@fastly/database/DatabaseService';
import {PasswordService} from '@fastly/shared/services/password.service';
import {trimStrings} from '@fastly/utils/trimStrings';
import {SHAIR_EMAIL} from '@fastly/constants/app';
import {AvatarService} from '@fastly/shared/services/avatar.service';
import {ImageService} from '@fastly/shared/services/image.service';
import {CreateAdminBodyType, EditAdminBodyType} from './admin.schema';
import {isString} from '@fastly/utils';

@Service('AdminServiceToken')
export class AdminService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly passwordService: PasswordService,
    private readonly avatarService: AvatarService,
    private readonly imageService: ImageService,
  ) {}

  count() {
    return this.databaseService.admin.count();
  }

  async getByIdOrThrow(id: string) {
    const admin = await this.getById(id);

    if (!admin) {
      throw new Unauthorized();
    }

    return admin;
  }

  async me(id: string) {
    const admin = await this.getByIdOrThrow(id);

    const {password, ...restOfAdmin} = admin;

    return restOfAdmin;
  }

  async createAdmin(data: CreateAdminBodyType) {
    const [address, dni, email, name, phone, birthDate] = trimStrings(
      data.address,
      data.dni,
      data.email,
      data.name,
      data.phone,
      data.birthDate,
    );
    let {avatar} = data;

    const foundAdmin = await this.getByEmail(email);

    if (foundAdmin) {
      throw new BadRequest('account_taken');
    }

    const numberOfAdmins = await this.count();

    const hashedPassword = await this.passwordService.hash(data.password);

    if (avatar && isString(avatar)) {
      avatar = await this.imageService.saveJpgFromBase64(
        avatar,
        'admins',
        'avatar',
      );
    }

    const defaultAvatar = this.avatarService.getDefaultAvatar();

    return this.databaseService.admin.create({
      data: {
        address,
        avatar: avatar || defaultAvatar,
        birthDate: new Date(birthDate),
        dni,
        email,
        name,
        phone,
        password: hashedPassword,
        isActive: numberOfAdmins === 0,
      },
    });
  }

  async editAdmin(adminId: string, data: EditAdminBodyType) {
    const [address, dni, email, name, phone, birthDate] = trimStrings(
      data.address,
      data.dni,
      data.email,
      data.name,
      data.phone,
      data.birthDate,
    );
    let {avatar} = data;

    const foundAdmin = await this.getByIdOrThrow(adminId);

    const hashedPassword = await this.passwordService.hash(data.password);

    if (avatar && isString(avatar)) {
      avatar = await this.imageService.saveJpgFromBase64(
        avatar,
        'admins',
        foundAdmin.id,
      );
    }

    const defaultAvatar = this.avatarService.getDefaultAvatar();

    return this.databaseService.admin.update({
      where: {
        id: foundAdmin.id,
      },
      data: {
        address,
        phone,
        name,
        dni,
        email,
        password: hashedPassword,
        avatar: avatar || defaultAvatar,
        isActive: data.isActive,
        birthDate: new Date(birthDate),
      },
    });
  }

  async deleteAdmin(id: string) {
    const admin = await this.getById(id);

    if (!admin) {
      throw new Unauthorized();
    }

    if (admin.email === SHAIR_EMAIL) {
      throw new Unauthorized('lol, no puedes eliminar a Shair jajajsda');
    }

    return this.databaseService.admin.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
  }

  getById(id: string) {
    return this.databaseService.admin.findUnique({
      where: {
        id,
      },
    });
  }

  async getAdmins() {
    return this.databaseService.admin.findMany({
      select: {
        password: false,
        address: true,
        avatar: true,
        banReason: true,
        birthDate: true,
        createdAt: true,
        dni: true,
        email: true,
        id: true,
        isActive: true,
        isBanned: true,
        name: true,
        phone: true,
        updatedAt: true,
      },
    });
  }

  getByEmail(email: string) {
    return this.databaseService.admin.findUnique({
      where: {
        email,
      },
    });
  }

  async banAdmin(adminId: string, banReason?: string) {
    return this.databaseService.admin.update({
      where: {
        id: adminId,
      },
      data: {
        isBanned: true,
        banReason,
      },
    });
  }

  async getIsAdminActive(id: string) {
    const admin = await this.getByIdOrThrow(id);

    return admin.isActive && !admin.isBanned;
  }

  async getActiveAdmins() {
    return this.databaseService.admin.findMany({
      where: {
        isActive: true,
        isBanned: false,
      },
    });
  }

  async updateAdminRefreshToken(adminId: string, refreshToken: string | null) {
    return this.databaseService.admin.update({
      where: {
        id: adminId,
      },
      data: {
        refreshToken,
      },
    });
  }

  async updateAdminResetPasswordToken(
    adminId: string,
    resetPasswordToken: string | null,
  ) {
    return this.databaseService.admin.update({
      where: {
        id: adminId,
      },
      data: {
        resetPasswordToken,
      },
    });
  }

  async updateAdminPassword(adminId: string, password: string) {
    return this.databaseService.admin.update({
      where: {
        id: adminId,
      },
      data: {
        password,
      },
    });
  }
}
