import { AfterLoad, Column, Entity, ManyToOne } from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { Base } from '../../shared/entities/base.entity';
import { StoreCategory } from '../../shared/enums/storeCategories.enum';

@Entity('stores')
export class Store extends Base {
	@ManyToOne(() => Customer, (customer) => customer.stores)
	owner: Customer;

	@Column()
	name: string;

	@Column()
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
		if (this.openTime === undefined && this.closeTime === undefined) {
			this.openFullTime = true;
		} else {
			this.openFullTime = false;
		}
	}
}
