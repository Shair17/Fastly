import { Entity, Column } from 'typeorm';
import { UserBase } from '../../shared/entities/userBase.entity';
import { DealerVehicle } from '../../shared/enums/dealerVehicle.enum';

@Entity('dealers')
export class Dealer extends UserBase {
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
