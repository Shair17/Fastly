import { Column } from 'typeorm';
import {
	IsEmail,
	IsString,
	IsOptional,
	IsUrl,
	IsBoolean,
	MinLength,
	MaxLength,
} from 'class-validator';
import { Base } from './base.entity';
import { getDefaultAvatar } from '../../utils/getDefaultAvatar';

const defaultAvatar = getDefaultAvatar(100);

export abstract class UserBase extends Base {
	@Column()
	@IsString()
	name: string;

	@Column()
	@IsEmail()
	email: string;

	@Column()
	@IsString()
	password: string;

	@Column({
		type: 'varchar',
		length: 8,
	})
	@MinLength(8)
	@MaxLength(8)
	dni: string;

	@Column({
		type: 'varchar',
		length: 9,
	})
	@MinLength(9)
	@MaxLength(9)
	phone: string;

	@Column()
	@IsString()
	address: string;

	@Column({
		default: defaultAvatar,
	})
	@IsUrl()
	avatar?: string;

	@Column()
	birth_date: Date;

	@Column({
		default: false,
		nullable: true,
	})
	@IsOptional()
	is_banned?: boolean;

	@Column({
		nullable: true,
	})
	@IsOptional()
	ban_reason?: string;

	@Column({
		default: false,
	})
	@IsBoolean()
	is_active: boolean;
}
