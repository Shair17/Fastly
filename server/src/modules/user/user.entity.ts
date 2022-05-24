import { Column, Entity, OneToMany } from 'typeorm';
import { UserAddress } from './user-address.entity';
import { IsString, MinLength, MaxLength } from 'class-validator';
import { UserAppBase } from '../../shared/entities/userAppBase.entity';

@Entity('users')
export class User extends UserAppBase {
	@OneToMany(() => UserAddress, (address) => address.user, { nullable: true })
	addresses?: UserAddress[];

	@Column()
	@IsString()
	facebookId: string;

	@Column()
	@IsString()
	facebookAccessToken: string;

	@Column({
		type: 'varchar',
		length: 9,
		nullable: true,
	})
	@MinLength(9)
	@MaxLength(9)
	phone?: string | null;

	@Column({
		type: 'varchar',
		length: 8,
		nullable: true,
	})
	@MinLength(8)
	@MaxLength(8)
	dni?: string | null;
}
