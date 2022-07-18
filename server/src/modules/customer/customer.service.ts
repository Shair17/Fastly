import {Service} from 'fastify-decorators';
import {Unauthorized} from 'http-errors';
import {DatabaseService} from '@fastly/database/DatabaseService';
import {Customer} from '@prisma/client';

@Service('CustomerServiceToken')
export class CustomerService {
  constructor(private readonly databaseService: DatabaseService) {}

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

  async me(customerId: string) {
    const customer = await this.getById(customerId);

    if (!customer) {
      throw new Unauthorized();
    }

    const {password, ...restOfCustomer} = customer;

    return restOfCustomer;
  }

  async banCustomer(customerId: string, banReason?: string) {
    return this.databaseService.customer.update({
      where: {
        id: customerId,
      },
      data: {
        isBanned: true,
        banReason,
      },
    });
  }

  async getCustomers() {
    return this.databaseService.customer.findMany();
    // return this.customerRepository.find({
    // 	select: [
    // 		'address',
    // 		'age',
    // 		'avatar',
    // 		'banReason',
    // 		'birthDate',
    // 		'createdAt',
    // 		'dni',
    // 		'email',
    // 		'id',
    // 		'isActive',
    // 		'isBanned',
    // 		'name',
    // 		'phone',
    // 		'stores',
    // 		'updatedAt',
    // 	],
    // });
  }

  getById(id: string) {
    return this.databaseService.customer.findUnique({
      where: {
        id,
      },
    });
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
