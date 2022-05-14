import { Entity, Column } from 'typeorm';
import { IsBoolean } from 'class-validator';
import { UserBase } from '../../shared/entities/userBase.entity';
import { DealerVehicle } from '../../shared/enums/dealerVehicle.enum';

@Entity('dealers')
export class Dealer extends UserBase {
	@Column({
		type: 'enum',
		enum: DealerVehicle,
	})
	vehicle: DealerVehicle;

	@Column()
	@IsBoolean()
	available: boolean;
}

export { DealerVehicle };
