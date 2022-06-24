import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Dealer } from '../dealer/dealer.entity';
import { Base } from '../../shared/entities/base.entity';
import { Product } from '../product/product.entity';
import { OrderStatus } from '../../shared/enums/order-status.enum';

@Entity('orders')
export class Order extends Base {
	@ManyToOne(() => Dealer, (dealer) => dealer.orders)
	dealer: Dealer;

	@OneToOne(() => Product)
	@JoinColumn()
	product: Product;

	@Column({
		type: 'float',
		name: 'delivery_price',
		unsigned: true,
	})
	deliveryPrice: number;

	@Column({
		default: 1,
		unsigned: false,
	})
	quantity: number;

	@Column({
		type: 'enum',
		enum: OrderStatus,
		default: OrderStatus.PENDING,
	})
	status: OrderStatus;

	@Column({
		type: 'varchar',
		nullable: true,
	})
	message?: string | null;

	// hora de entrega del pedido!!!
	@Column({
		type: 'date',
		nullable: true,
	})
	arrivalTime?: Date | null;
}
