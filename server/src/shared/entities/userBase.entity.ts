import { Column, AfterLoad } from 'typeorm';
import { Base } from './base.entity';
import { getDefaultAvatar } from '../../utils/getDefaultAvatar';
import { calcAgeFromDate } from '../../utils/calcAgeFromDate';

const defaultAvatar = getDefaultAvatar(100);

export abstract class UserBase extends Base {
	@Column({
		type: 'varchar',
	})
	name: string;

	@Column({
		type: 'varchar',
	})
	email: string;

	@Column({
		type: 'varchar',
	})
	password: string;

	@Column({
		type: 'varchar',
		name: 'refresh_token',
		length: 1020,
		nullable: true,
	})
	refreshToken?: string | null;

	@Column({
		type: 'varchar',
		nullable: true,
	})
	resetPasswordToken?: string | null;

	@Column({
		type: 'varchar',
		length: 8,
	})
	dni: string;

	@Column({
		type: 'varchar',
		length: 9,
	})
	phone: string;

	@Column({
		type: 'varchar',
	})
	address: string;

	@Column({
		type: 'varchar',
		default: defaultAvatar,
	})
	avatar?: string | null;

	@Column({
		default: false,
		nullable: true,
		name: 'is_banned',
	})
	isBanned?: boolean;

	@Column({
		type: 'varchar',
		nullable: true,
		name: 'ban_reason',
	})
	banReason?: string | null;

	@Column({
		default: false,
		name: 'is_active',
	})
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
