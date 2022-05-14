import { Base } from './base.entity';
export declare abstract class UserAppBase extends Base {
    name: string;
    email: string;
    is_banned?: boolean;
    ban_reason?: string;
    is_active: boolean;
}
