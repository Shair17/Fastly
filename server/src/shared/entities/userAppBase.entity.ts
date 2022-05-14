import { Column } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Base } from './base.entity';

export abstract class UserAppBase extends Base {
	@Column()
	name: string;

	@Column()
	@IsEmail()
	email: string;

	@Column({
		default: false,
		nullable: true,
	})
	is_banned?: boolean;

	@Column({
		nullable: true,
	})
	ban_reason?: string;

	@Column({
		default: false,
	})
	is_active: boolean;
}
