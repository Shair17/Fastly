import { Entity } from 'typeorm';
import { UserBase } from '../../shared/entities/userBase.entity';

@Entity('admins')
export class Admin extends UserBase {}
