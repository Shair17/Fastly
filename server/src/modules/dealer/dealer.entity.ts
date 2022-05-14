import { Entity } from 'typeorm';
import { UserBase } from '../../shared/entities/userBase.entity';

@Entity('dealers')
export class Dealer extends UserBase {}
