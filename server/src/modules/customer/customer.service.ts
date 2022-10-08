import {Service} from 'fastify-decorators';
import {Unauthorized, BadRequest, NotFound} from 'http-errors';
import {DatabaseService} from '../../database/DatabaseService';
import {Customer} from '@prisma/client';
import {
  CreateCustomerBodyType,
  DeleteCustomerByAdminParamsType,
  EditCustomerBodyType,
} from './customer.schema';
import {trimStrings} from '../../utils/trimStrings';
import {CloudinaryService} from '../../shared/services/cloudinary.service';
import {isString} from '../../utils';
import {AvatarService} from '../../shared/services/avatar.service';
import {PasswordService} from '../../shared/services/password.service';
import {SHAIR_EMAIL} from '../../constants/app';

@Service('CustomerServiceToken')
export class CustomerService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly avatarService: AvatarService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly passwordService: PasswordService,
  ) {}

  async getMyStores(customerId: string) {
    const foundCustomer = await this.getByIdOrThrow(customerId);

    const customer = await this.databaseService.customer.findUnique({
      where: {
        id: foundCustomer.id,
      },
      include: {
        stores: true,
      },
    });

    if (!customer) {
      throw new NotFound();
    }

    const response = customer.stores.map(store => {
      return {
        ...store,
        owner: {
          email: foundCustomer.email,
        },
      };
    });

    return response;
  }

  count() {
    return this.databaseService.customer.count();
  }

  async getByIdOrThrow(id: string) {
    const customer = await this.getById(id);

    if (!customer) {
      throw new Unauthorized();
    }

    return customer;
  }

  async getByEmailOrThrow(email: string) {
    const customer = await this.getByEmail(email);

    if (!customer) {
      throw new Unauthorized();
    }

    return customer;
  }

  async me(customerId: string) {
    const customer = await this.getById(customerId);

    if (!customer) {
      throw new Unauthorized();
    }

    const {password, ...restOfCustomer} = customer;

    return restOfCustomer;
  }

  async banCustomer(customerId: string, isBanned: boolean, banReason?: string) {
    return this.databaseService.customer.update({
      where: {
        id: customerId,
      },
      data: {
        isBanned,
        banReason,
      },
    });
  }

  async getCustomers() {
    return this.databaseService.customer.findMany({
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
        refreshToken: false,
        resetPasswordToken: false,
      },
    });
  }

  async createCustomer(data: CreateCustomerBodyType) {
    const [address, dni, email, name, phone, birthDate] = trimStrings(
      data.address,
      data.dni,
      data.email,
      data.name,
      data.phone,
      data.birthDate,
    );
    let {avatar} = data;

    const foundCustomer = await this.getByEmail(email);

    if (foundCustomer) {
      throw new BadRequest('account_taken');
    }

    if (!this.passwordService.isValidPassword(data.password)) {
      throw new BadRequest('invalid_password');
    }

    const hashedPassword = await this.passwordService.hash(data.password);

    if (avatar && isString(avatar)) {
      let filename = `${name
        .toLocaleLowerCase()
        .replace(' ', '')}-${Date.now().toString()}`;
      let cloudinaryResponse = await this.cloudinaryService.upload(
        'customers',
        avatar,
        filename,
      );
      avatar = cloudinaryResponse.secure_url;
    }

    const defaultAvatar = this.avatarService.getDefaultAvatar();

    return this.create({
      address,
      avatar: avatar || defaultAvatar,
      birthDate: new Date(birthDate),
      dni,
      email,
      name,
      phone,
      password: hashedPassword,
      isActive: false,
    });
  }

  getById(id: string) {
    return this.databaseService.customer.findUnique({
      where: {
        id,
      },
    });
  }

  async getByIdOnlyCustomerOrThrow(id: string) {
    const customer = await this.databaseService.customer.findUnique({
      where: {id},
    });

    if (!customer) {
      throw new Unauthorized();
    }

    return customer;
  }

  async editCustomer(customerId: string, data: EditCustomerBodyType) {
    const [address, dni, email, name, phone, birthDate] = trimStrings(
      data.address,
      data.dni,
      data.email,
      data.name,
      data.phone,
      data.birthDate,
    );
    let {avatar} = data;

    const foundCustomer = await this.getByIdOrThrow(customerId);

    if (!this.passwordService.isValidPassword(data.password)) {
      throw new BadRequest('invalid_password');
    }

    const hashedPassword = await this.passwordService.hash(data.password);

    if (avatar && isString(avatar)) {
      let filename = `${foundCustomer.name
        .toLocaleLowerCase()
        .replace(' ', '')}-${foundCustomer.id}`;
      let cloudinaryResponse = await this.cloudinaryService.upload(
        'customers',
        avatar,
        filename,
      );
      avatar = cloudinaryResponse.secure_url;
    }

    const defaultAvatar = this.avatarService.getDefaultAvatar();

    return this.databaseService.customer.update({
      where: {
        id: foundCustomer.id,
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

  async deleteCustomer({id}: DeleteCustomerByAdminParamsType) {
    const customer = await this.getById(id);

    if (!customer) {
      throw new Unauthorized();
    }

    if (customer.email === SHAIR_EMAIL) {
      throw new Unauthorized('lol, no puedes eliminar a Shair jajajsda');
    }

    return this.databaseService.customer.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
  }

  async toggleBanCustomerByAdmin(id: string, reason?: string) {
    const customer = await this.getByIdOnlyCustomerOrThrow(id);

    await this.banCustomer(customer.id, !customer.isBanned, reason);

    return {
      statusCode: 200,
      message: `User with id ${customer.id} was ${
        customer.isBanned ? 'unbanned' : 'banned'
      }.`,
      success: true,
    };
  }

  async create({
    address,
    avatar,
    birthDate,
    dni,
    name,
    email,
    phone,
    password,
    isActive,
  }: Pick<
    Customer,
    | 'phone'
    | 'password'
    | 'isActive'
    | 'email'
    | 'address'
    | 'avatar'
    | 'birthDate'
    | 'dni'
    | 'name'
  >) {
    return this.databaseService.customer.create({
      data: {
        address,
        avatar,
        birthDate: new Date(birthDate),
        dni,
        email,
        name,
        phone,
        password,
        isActive,
      },
    });
  }

  getByEmail(email: string) {
    return this.databaseService.customer.findUnique({where: {email}});
  }

  async updateCustomerRefreshToken(
    customerId: string,
    refreshToken: string | null,
  ) {
    return this.databaseService.customer.update({
      where: {
        id: customerId,
      },
      data: {
        refreshToken,
      },
    });
  }

  async updateCustomerResetPasswordToken(
    customerId: string,
    resetPasswordToken: string | null,
  ) {
    return this.databaseService.customer.update({
      where: {
        id: customerId,
      },
      data: {
        resetPasswordToken,
      },
    });
  }

  async updateCustomerPassword(customerId: string, password: string) {
    return this.databaseService.customer.update({
      where: {
        id: customerId,
      },
      data: {
        password,
      },
    });
  }
}
