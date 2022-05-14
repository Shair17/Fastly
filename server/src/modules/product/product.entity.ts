import { Column, Entity } from 'typeorm';
import { IsNumber, IsPositive, IsString, IsUrl } from 'class-validator';
import { Base } from '../../shared/entities/base.entity';

@Entity('products')
export class Product extends Base {
	@Column()
	@IsString()
	name: string;

	@Column()
	@IsNumber()
	@IsPositive()
	price: number;

	// Debería agregar el blur hash??
	// https://blurha.sh/

	@Column()
	@IsString()
	@IsUrl()
	image: string;
}
