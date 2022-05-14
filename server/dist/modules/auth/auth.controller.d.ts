import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    logInWithFacebook(): Promise<string>;
    refreshFacebookTokens(): Promise<string>;
    loginAdmin(): Promise<string>;
    registerAdmin(): Promise<string>;
    refreshAdminTokens(): Promise<string>;
    loginCustomer(): Promise<string>;
    registerCustomer(): Promise<string>;
    refreshCustomerTokens(): Promise<string>;
    loginDealer(): Promise<string>;
    registerDealer(): Promise<string>;
    refreshDealerTokens(): Promise<string>;
}
