import { Entity, Column, OneToMany } from 'typeorm';
import { DealerRanking } from './dealer-ranking.entity';
import { Order } from '../order/order.entity';
import { UserBase } from '../../shared/entities/userBase.entity';
import { DealerVehicle } from '../../shared/enums/dealer-vehicle.enum';

@Entity('dealers')
export class Dealer extends UserBase {
	@OneToMany(() => Order, (order) => order.dealer, { nullable: true })
	orders?: Order[];

	@OneToMany(() => DealerRanking, (ranking) => ranking.dealer, {
		nullable: true,
	})
	rankings?: DealerRanking[];

	@Column({
		type: 'enum',
		enum: DealerVehicle,
		default: DealerVehicle.NONE,
	})
	vehicle: DealerVehicle;

	@Column({
		default: false,
	})
	available: boolean;
}

export { DealerVehicle };
