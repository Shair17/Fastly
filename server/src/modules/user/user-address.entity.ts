import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Base } from '../../shared/entities/base.entity';
import { UserAddressTag } from '../../shared/enums/userAddressTag.enum';

@Entity('users_addresses')
export class UserAddress extends Base {
	@Column()
	name: string;

	@Column()
	street: string;

	// Instrucciones para llegar o referencia
	@Column()
	instructions: string;

	@Column({
		type: 'enum',
		enum: UserAddressTag,
	})
	tag: UserAddressTag;

	@Column()
	zip: string;

	@Column()
	city: string;

	// [latitude, longitude]
	@Column({ type: 'simple-array' })
	coordinates: number[];

	@ManyToOne(() => User, (user) => user.addresses)
	user: User;
}