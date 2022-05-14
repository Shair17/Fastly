import { Controller, GET as Get } from 'fastify-decorators';
import { AdminService } from './admin.service';

@Controller('/admins')
export class AdminController {
	constructor(private readonly adminService: AdminService) {}
}
