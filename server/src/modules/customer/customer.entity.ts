import { Entity, OneToMany } from 'typeorm';
import { Store } from '../store/store.entity';
import { UserBase } from '../../shared/entities/userBase.entity';

@Entity('customers')
export class Customer extends UserBase {
	@OneToMany(() => Store, (store) => store.owner, { nullable: true })
	stores?: Store[];
}
