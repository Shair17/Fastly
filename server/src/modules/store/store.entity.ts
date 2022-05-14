import { Entity } from 'typeorm';
import { Base } from '../../shared/entities/base.entity';

@Entity('stores')
export class Store extends Base {}
