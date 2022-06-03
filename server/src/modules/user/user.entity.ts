import { Column, Entity, OneToMany, AfterLoad } from 'typeorm';
import { UserAddress } from './user-address.entity';
import { UserFavorite } from './user-favorite.entity';
import { UserCart } from './user-cart.entity';
import { UserAppBase } from '../../shared/entities/userAppBase.entity';

@Entity('users')
export class User extends UserAppBase {
	@OneToMany(() => UserAddress, (address) => address.user, { nullable: true })
	addresses?: UserAddress[];

	@OneToMany(() => UserFavorite, (favorites) => favorites.user, {
		nullable: true,
	})
	favorites?: UserFavorite[];

	@OneToMany(() => UserCart, (cart) => cart.user, { nullable: true })
	cart?: UserCart[];

	@Column({
		type: 'varchar',
		nullable: true,
	})
	avatar?: string | null;

	@Column()
	facebookId: string;

	@Column()
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

	isNewUser: boolean;

	@AfterLoad()
	checkIsNewUser() {
		if (this.addresses && this.addresses.length >= 1) {
			this.isNewUser = false;
		} else {
			this.isNewUser = true;
		}
	}
}
