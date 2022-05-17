import { Controller, GET as Get } from 'fastify-decorators';
import { AdminService } from './admin.service';
import { Request, Reply } from '../../interfaces/http.interfaces';
import {
	hasBearerToken,
	adminIsAuthenticated,
} from '../../shared/hooks/auth.hook';

@Controller('/admins')
export class AdminController {
	constructor(private readonly adminService: AdminService) {}

	@Get('/me', {
		onRequest: [hasBearerToken, adminIsAuthenticated],
	})
	async me({ adminId }: Request, reply: Reply) {
		return this.adminService.me(adminId);
	}
}
