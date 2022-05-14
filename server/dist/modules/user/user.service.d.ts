import { UserFacade } from './user.facade';
export declare class UserService {
    private readonly userFacade;
    constructor(userFacade: UserFacade);
    getUsers(): Promise<import("./user.entity").User[]>;
}
