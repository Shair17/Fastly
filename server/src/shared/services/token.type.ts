export type AuthTokenType = 'admin' | 'user' | 'customer' | 'dealer';
export type AuthTokenPayload = {};

export type ForgotPasswordTokenType = 'admin' | 'customer' | 'dealer';
export type ForgotPasswordTokenPayload = {
	id: string;
	email: string;
};
