import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Dealer } from '../dealer/dealer.entity';
import { Base } from '../../shared/entities/base.entity';
import { Product } from '../product/product.entity';
import { OrderStatus } from '../../shared/enums/order-status.enum';
import { User } from '../user/user.entity';

@Entity('orders')
export class Order extends Base {
	// nullable: true ??
	@ManyToOne(() => Dealer, (dealer) => dealer.orders, { nullable: true })
	dealer: Dealer;

	@ManyToOne(() => User, (user) => user.orders)
	user: User;

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
