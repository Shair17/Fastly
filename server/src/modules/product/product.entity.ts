import { Column, Entity, ManyToOne } from 'typeorm';
import { Store } from '../store/store.entity';
import { Coupon } from '../coupon/coupon.entity';
import { Base } from '../../shared/entities/base.entity';
import { UserFavorite } from '../user/user-favorite.entity';

@Entity('products')
export class Product extends Base {
	@ManyToOne(() => Store, (store) => store.products)
	store: Store;

	@ManyToOne(() => UserFavorite, (userFavorite) => userFavorite.products)
	userFavorite: UserFavorite;

	@ManyToOne(() => Coupon, (coupon) => coupon.products)
	coupon: Coupon;

	@Column({
		type: 'varchar',
	})
	name: string;

	@Column({
		type: 'varchar',
		nullable: true,
	})
	description?: string | null;

	@Column({
		type: 'double',
		unsigned: true,
	})
	price: number;

	@Column({
		type: 'varchar',
	})
	image: string;

	// TODO: Blurhash
	@Column({
		type: 'varchar',
		name: 'blurhash',
	})
	blurHash: string;
}
