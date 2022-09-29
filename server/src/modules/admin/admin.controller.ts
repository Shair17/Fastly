import type {FastifyRequest as Request, FastifyReply as Reply} from 'fastify';
import {Controller, GET, POST, PUT, DELETE} from 'fastify-decorators';
import {Unauthorized} from 'http-errors';
import {hasBearerToken, adminIsAuthenticated} from '../../shared/hooks/auth';
import {AdminService} from './admin.service';
import {
  GetAdminParams,
  GetAdminParamsType,
  DeleteAdminParams,
  DeleteAdminParamsType,
  CreateAdminBody,
  CreateAdminBodyType,
  EditAdminBody,
  EditAdminBodyType,
  EditAdminParamsType,
  EditAdminParams,
} from './admin.schema';

@Controller('/v1/admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @GET('/count')
  async count() {
    return this.adminService.count();
  }

  @GET('/', {
    onRequest: [hasBearerToken, adminIsAuthenticated],
  })
  async getAdmins() {
    return this.adminService.getAdmins();
  }

  @GET('/me', {
    onRequest: [hasBearerToken, adminIsAuthenticated],
  })
  async me(request: Request, reply: Reply) {
    return this.adminService.me(request.adminId);
  }

  @GET('/:id', {
    schema: {
      params: GetAdminParams,
    },
    onRequest: [hasBearerToken, adminIsAuthenticated],
  })
  async getAdmin(
    request: Request<{
      Params: GetAdminParamsType;
    }>,
    reply: Reply,
  ) {
    return this.adminService.me(request.params.id);
  }

  @POST('/', {
    schema: {
      body: CreateAdminBody,
    },
    onRequest: [hasBearerToken, adminIsAuthenticated],
  })
  async createAdmin(
    request: Request<{
      Body: CreateAdminBodyType;
    }>,
    reply: Reply,
  ) {
    await this.adminService.createAdmin(request.body);

    return {
      statusCode: 200,
      message: 'Admin Created',
      success: true,
    };
  }

  @PUT('/:id', {
    schema: {
      body: EditAdminBody,
      params: EditAdminParams,
    },
    onRequest: [hasBearerToken, adminIsAuthenticated],
  })
  async EditAdmin(
    request: Request<{
      Body: EditAdminBodyType;
      Params: EditAdminParamsType;
    }>,
    reply: Reply,
  ) {
    await this.adminService.editAdmin(request.params.id, request.body);

    return {
      statusCode: 200,
      message: 'Admin Edited',
      success: true,
    };
  }

  @DELETE('/:id', {
    schema: {
      params: DeleteAdminParams,
    },
    onRequest: [hasBearerToken, adminIsAuthenticated],
  })
  async deleteAdmin(
    request: Request<{
      Params: DeleteAdminParamsType;
    }>,
    reply: Reply,
  ) {
    if (request.adminId === request.params.id) {
      throw new Unauthorized();
    }

    await this.adminService.deleteAdmin(request.params.id);

    return {
      statusCode: 200,
      message: 'Admin Deleted',
      success: true,
    };
  }

  @GET('/all-count', {
    onRequest: [hasBearerToken, adminIsAuthenticated],
  })
  async getAllCount() {
    return this.adminService.getAllCount();
  }
}
