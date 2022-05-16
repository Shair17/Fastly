import { Static, Type } from '@sinclair/typebox';

export const LogInWithFacebook = Type.Object(
	{
		accessToken: Type.String(),
		userID: Type.String(),
	},
	{
		additionalProperties: false,
	}
);
export type LogInWithFacebookType = Static<typeof LogInWithFacebook>;

export const CommonUserLogin = Type.Object(
	{
		email: Type.String({ format: 'email' }),
		password: Type.String(),
	},
	{
		additionalProperties: false,
	}
);
export type CommonUserLoginType = Static<typeof CommonUserLogin>;
