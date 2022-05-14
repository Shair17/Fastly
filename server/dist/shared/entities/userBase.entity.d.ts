import { Base } from './base.entity';
export declare abstract class UserBase extends Base {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    birth_date: Date;
    is_banned?: boolean;
    ban_reason?: string;
    is_active: boolean;
}
