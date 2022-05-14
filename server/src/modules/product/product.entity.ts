import { Entity } from 'typeorm';
import { Base } from '../../shared/entities/base.entity';

@Entity('products')
export class Product extends Base {}
