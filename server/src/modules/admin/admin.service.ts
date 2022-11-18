import {Service} from 'fastify-decorators';
import {Unauthorized, BadRequest, NotFound} from 'http-errors';
import {DatabaseService} from '../../database/DatabaseService';
import {trimStrings} from '../../utils/trimStrings';
import {SHAIR_EMAIL} from '../../constants/app';
import {CreateAdminBodyType, EditAdminBodyType} from './admin.schema';
import {isString} from '../../utils';
import {UserService} from '../user/user.service';
import {CustomerService} from '../customer/customer.service';
import {DealerService} from '../dealer/dealer.service';
import {StoreService} from '../store/store.service';
import {
  AvatarService,
  CloudinaryService,
  PasswordService,
} from '../../shared/services';
import {OrderService} from '../order/order.service';
import {CouponService} from '../coupon/coupon.service';
import {ProductService} from '../product/product.service';
import {OrderQueue} from '../order/order-queue';

@Service('AdminServiceToken')
export class AdminService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly userService: UserService,
    private readonly customerService: CustomerService,
    private readonly storeService: StoreService,
    private readonly orderService: OrderService,
    private readonly orderQueue: OrderQueue,
    private readonly couponService: CouponService,
    private readonly productService: ProductService,
    private readonly dealerService: DealerService,
    private readonly passwordService: PasswordService,
    private readonly avatarService: AvatarService,
    private readonly cloudinaryService: CloudinaryService,
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

  async getAllCount() {
    const accounts = {
      adminsCount: await this.count(),
      usersCount: await this.userService.count(),
      customersCount: await this.customerService.count(),
      dealersCount: await this.dealerService.count(),
    };
    const system = {
      stores: await this.storeService.count(),
      products: await this.productService.count(),
      coupons: await this.couponService.count(),
      orders: await this.orderService.count(),
      ordersQueue: this.orderQueue.size(),
    };

    return {accounts, system};
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

    if (!this.passwordService.isValidPassword(data.password)) {
      throw new BadRequest('invalid_password');
    }

    const hashedPassword = await this.passwordService.hash(data.password);

    if (avatar && isString(avatar)) {
      let filename = `${name
        .toLocaleLowerCase()
        .replace(' ', '')}-${Date.now().toString()}`;
      let cloudinaryResponse = await this.cloudinaryService.upload(
        'admins',
        avatar,
        filename,
      );
      avatar = cloudinaryResponse.secure_url;
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

    if (!this.passwordService.isValidPassword(data.password)) {
      throw new BadRequest('invalid_password');
    }

    const hashedPassword = await this.passwordService.hash(data.password);

    if (avatar && isString(avatar)) {
      let filename = `${foundAdmin.name.toLocaleLowerCase().replace(' ', '')}-${
        foundAdmin.id
      }`;
      let cloudinaryResponse = await this.cloudinaryService.upload(
        'admins',
        avatar,
        filename,
      );
      avatar = cloudinaryResponse.secure_url;
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
      throw new BadRequest('lol, no puedes eliminar a Shair jajajsda');
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
