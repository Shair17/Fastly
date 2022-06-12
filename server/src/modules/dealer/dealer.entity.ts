import { Entity, Column, OneToMany, AfterLoad } from 'typeorm';
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

	ranking: number;

	@AfterLoad()
	calcDealerRanking() {
		if (this.rankings !== undefined) {
			let sum = 0;

			for (const ranking of this.rankings) {
				sum += ranking.value;
			}

			this.ranking = Math.round(sum / this.rankings.length);
		} else {
			this.ranking = 0;
		}
	}
}

export { DealerVehicle };
