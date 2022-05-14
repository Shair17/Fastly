import { Controller, GET as Get } from 'fastify-decorators';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async getUsers() {
		const users = this.userService.getUsers();

		console.log(users);

		return 'sadsa';
	}
}
