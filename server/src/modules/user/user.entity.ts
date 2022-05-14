import { Column, Entity } from 'typeorm';
import { UserAppBase } from '../../shared/entities/userAppBase.entity';

@Entity('users')
export class User extends UserAppBase {
	@Column()
	facebookId: string;
}
