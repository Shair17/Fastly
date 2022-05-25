import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { Product } from '../product/product.entity';
import { Base } from '../../shared/entities/base.entity';

@Entity('users_cart')
export class UserCart extends Base {
	@OneToOne(() => Product)
	@JoinColumn()
	product: Product;

	@Column({
		unsigned: true,
		default: 1,
	})
	quantity: number;

	@ManyToOne(() => User, (user) => user.cart)
	user: User;
}
