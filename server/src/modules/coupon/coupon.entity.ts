import { Entity, Column, AfterLoad, OneToMany } from 'typeorm';
import { Product } from '../product/product.entity';
import { Base } from '../../shared/entities/base.entity';
import { generateRandomId } from '../../utils/generateRandomId';

@Entity('coupons')
export class Coupon extends Base {
	@OneToMany(() => Product, (product) => product.coupon)
	products: Product[];

	@Column({
		type: 'varchar',
		length: 10,
		default: () => generateRandomId(),
		unique: true,
	})
	code: string;

	@Column({
		type: 'varchar',
		nullable: true,
	})
	description?: string | null;

	// Debe estar entre 0 y 100
	@Column({
		type: 'float',
	})
	discount: number;

	@Column({
		type: 'date',
		nullable: true,
	})
	expiration?: Date | null;

	decimalDiscount: number;
	isExpired: boolean;

	@AfterLoad()
	calcDecimalDiscount() {
		// el this.discount es de 0 a 100
		if (this.discount >= 0 && this.discount <= 100) {
			// esto establece el descuento: si this.discount es 50 entonces lo convierte en 0.5 y así...
			this.decimalDiscount = this.discount / 100;
		} else {
			// ERROR
			console.error('this.discount es menor a 0 o mayor a 100');
		}
	}

	@AfterLoad()
	checkCouponExpiration() {
		if (this.expiration) {
			const expiration = new Date(this.expiration);
			const now = new Date();

			if (expiration > now) {
				console.log('cupon expirado');
				this.isExpired = true;
			} else {
				console.log('cupon aun no expira');
				this.isExpired = false;
			}
		} else {
			console.log('el cupon no tiene fecha de expiracion');
			this.isExpired = false;
		}
	}
}
