import { Column, AfterLoad } from 'typeorm';
import {
	IsEmail,
	IsString,
	IsUrl,
	IsBoolean,
	MinLength,
	MaxLength,
} from 'class-validator';
import { Base } from './base.entity';
import { getDefaultAvatar } from '../../utils/getDefaultAvatar';
import { calcAgeFromDate } from '../../utils/calcAgeFromDate';

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
		nullable: true,
	})
	refreshToken?: string | null;

	@Column({
		nullable: true,
	})
	resetPasswordToken?: string | null;

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
	avatar?: string | null;

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
	banReason?: string | null;

	@Column({
		default: false,
		name: 'is_active',
	})
	@IsBoolean()
	isActive: boolean;

	@Column({
		name: 'birth_date',
	})
	birthDate: Date;

	age: number;

	@AfterLoad()
	calcUserAge() {
		this.age = calcAgeFromDate(this.birthDate);
	}
}
