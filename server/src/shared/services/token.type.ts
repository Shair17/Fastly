export type AuthTokenType = "admin" | "user" | "customer" | "dealer";
export type AuthTokenPayload = {
  id: string;
  email?: string;
  name: string;
};

export type ForgotPasswordTokenType = "admin" | "customer" | "dealer";
export type ForgotPasswordTokenPayload = {
  id: string;
  email: string;
  name: string;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};
