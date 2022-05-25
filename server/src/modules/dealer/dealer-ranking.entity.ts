import { Column, Entity, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Dealer } from './dealer.entity';
import { User } from '../user/user.entity';
import { Base } from '../../shared/entities/base.entity';

@Entity('dealers_ranking')
export class DealerRanking extends Base {
	@ManyToOne(() => Dealer, (dealer) => dealer.rankings)
	dealer: Dealer;

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
