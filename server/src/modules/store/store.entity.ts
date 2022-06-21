import { AfterLoad, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { Product } from '../product/product.entity';
import { StoreRanking } from './store-ranking.entity';
import { Base } from '../../shared/entities/base.entity';
import { StoreCategory } from '../../shared/enums/store-categories.enum';

export { StoreCategory };

@Entity('stores')
export class Store extends Base {
	@ManyToOne(() => Customer, (customer) => customer.stores)
	owner: Customer;

	@OneToMany(() => Product, (product) => product.store)
	products: Product[];

	@OneToMany(() => StoreRanking, (ranking) => ranking.store)
	rankings?: StoreRanking[];

	@Column({
		type: 'varchar',
		nullable: true,
	})
	logo?: string | null;

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
		type: 'varchar',
	})
	address: string;

	@Column({
		type: 'enum',
		enum: StoreCategory,
	})
	category: StoreCategory;

	@Column({
		name: 'category_description',
		type: 'varchar',
		nullable: true,
	})
	categoryDescription?: string | null;

	@Column({
		name: 'open_time',
		type: 'time',
		nullable: true,
	})
	openTime: Date | null;

	@Column({
		name: 'close_time',
		type: 'time',
		nullable: true,
	})
	closeTime: Date | null;

	openFullTime?: boolean;

	@AfterLoad()
	getOpenFullTime() {
		// TODO: Probar si esto funciona!!
		if (
			(this.openTime === undefined && this.closeTime === undefined) ||
			(this.openTime === null && this.closeTime === null)
		) {
			this.openFullTime = true;
		} else {
			this.openFullTime = false;
		}
	}
}
