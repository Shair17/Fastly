import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Base } from '../../shared/entities/base.entity';
import { Product } from '../product/product.entity';

@Entity('users_favorites')
export class UserFavorite extends Base {
	@OneToMany(() => Product, (product) => product.userFavorite)
	products: Product[];

	@ManyToOne(() => User, (user) => user.favorites)
	user: User;
}
