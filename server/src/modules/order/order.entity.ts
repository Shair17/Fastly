import { Entity } from 'typeorm';
import { Base } from '../../shared/entities/base.entity';

@Entity('orders')
export class Order extends Base {}
