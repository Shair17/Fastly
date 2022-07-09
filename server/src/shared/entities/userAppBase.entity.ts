import { Column } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Base } from './base.entity';
import { getDefaultAvatar } from '../../utils/getDefaultAvatar';

const defaultAvatar = getDefaultAvatar(100);

export abstract class UserAppBase extends Base {
	@Column()
	name: string;

	@Column({
		type: 'varchar',
		default: defaultAvatar,
		nullable: true,
	})
	avatar?: string | null;

	@Column()
	facebookId: string;

	@Column({
		type: 'varchar',
		length: 510,
	})
	facebookAccessToken: string;

	@Column({
		type: 'varchar',
		length: 9,
		nullable: true,
	})
	phone?: string | null;

	@Column({
		type: 'varchar',
		length: 8,
		nullable: true,
	})
	dni?: string | null;

	@Column({
		nullable: true,
	})
	@IsEmail()
	email?: string;

	@Column({
		type: 'varchar',
		name: 'refresh_token',
		length: 1020,
		nullable: true,
	})
	refreshToken?: string | null;

	@Column({
		default: false,
		nullable: true,
		name: 'is_banned',
	})
	isBanned?: boolean;

	@Column({
		nullable: true,
		name: 'ban_reason',
	})
	banReason?: string;
}
