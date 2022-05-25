import { Column, Entity, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Store } from './store.entity';
import { Base } from '../../shared/entities/base.entity';

@Entity('stores_ranking')
export class StoreRanking extends Base {
	@ManyToOne(() => Store, (store) => store.rankings)
	store: Store;

	@OneToOne(() => User)
	@JoinColumn()
	user: User;

	@Column({
		type: 'varchar',
		nullable: true,
	})
	comment?: string | null;

	// Only values within {1...5}
	@Column({
		type: 'tinyint',
		unsigned: true,
	})
	value: number;
}
