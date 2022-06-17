import {
	Controller,
	GET as Get,
	POST as Post,
	PUT as Put,
	DELETE as Delete,
} from 'fastify-decorators';
import { AdminService } from './admin.service';
import { Request, Reply } from '../../interfaces/http.interfaces';
import { Unauthorized } from 'http-errors';
import {
	GetAdminParams,
	GetAdminParamsType,
	DeleteAdminParams,
	DeleteAdminParamsType,
} from './admin.schema';
import {
	hasBearerToken,
	adminIsAuthenticated,
} from '../../shared/hooks/auth.hook';

@Controller('/admins')
export class AdminController {
	constructor(private readonly adminService: AdminService) {}

	@Get('/count')
	async count() {
		return this.adminService.count();
	}

	@Get('/:id', {
		schema: {
			params: GetAdminParams,
		},
		onRequest: [hasBearerToken, adminIsAuthenticated],
	})
	async getAdmin(
		request: Request<{
			Params: GetAdminParamsType;
		}>,
		reply: Reply
	) {
		return this.adminService.me(request.params.id);
	}

	@Delete('/:id', {
		schema: {
			params: DeleteAdminParams,
		},
		onRequest: [hasBearerToken, adminIsAuthenticated],
	})
	async deleteAdmin(
		request: Request<{
			Params: DeleteAdminParamsType;
		}>,
		reply: Reply
	) {
		if (request.adminId === request.params.id) {
			throw new Unauthorized();
		}

		return this.adminService.deleteAdmin(request.params.id);
	}

	@Get('/', {
		onRequest: [hasBearerToken, adminIsAuthenticated],
	})
	async getAdmins(request: Request, reply: Reply) {
		return this.adminService.getAdmins();
	}

	@Get('/me', {
		onRequest: [hasBearerToken, adminIsAuthenticated],
	})
	async me(request: Request, reply: Reply) {
		return this.adminService.me(request.adminId);
	}
}
