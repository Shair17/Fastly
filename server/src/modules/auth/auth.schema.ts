import { Static, Type } from '@sinclair/typebox';

// facebook
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

// admin
export const AdminLogin = Type.Object(
	{
		email: Type.String({ format: 'email' }),
		password: Type.String(),
	},
	{
		additionalProperties: false,
	}
);
export type AdminLoginType = Static<typeof AdminLogin>;

export const AdminRegister = Type.Object(
	{
		name: Type.String(),
		email: Type.String({ format: 'email' }),
		password: Type.String(),
		dni: Type.RegEx(/^\d{8}(?:[-\s]\d{4})?$/),
		phone: Type.String({ minLength: 9, maxLength: 9 }),
		address: Type.String(),
		avatar: Type.Optional(Type.String()),
		birthDate: Type.String(),
	},
	{
		additionalProperties: false,
	}
);
export type AdminRegisterType = Static<typeof AdminRegister>;

// customer
export const CustomerLogin = Type.Object(
	{
		email: Type.String({ format: 'email' }),
		password: Type.String(),
	},
	{
		additionalProperties: false,
	}
);
export type CustomerLoginType = Static<typeof CustomerLogin>;

export const CustomerRegister = Type.Object(
	{
		name: Type.String(),
		email: Type.String({ format: 'email' }),
		password: Type.String(),
		dni: Type.RegEx(/^\d{8}(?:[-\s]\d{4})?$/),
		phone: Type.String({ minLength: 9, maxLength: 9 }),
		address: Type.String(),
		avatar: Type.Optional(Type.String()),
		birthDate: Type.String(),
	},
	{
		additionalProperties: false,
	}
);
export type CustomerRegisterType = Static<typeof CustomerRegister>;

// dealer
export const DealerLogin = Type.Object(
	{
		email: Type.String({ format: 'email' }),
		password: Type.String(),
	},
	{
		additionalProperties: false,
	}
);
export type DealerLoginType = Static<typeof DealerLogin>;

export const DealerRegister = Type.Object(
	{
		name: Type.String(),
		email: Type.String({ format: 'email' }),
		password: Type.String(),
		dni: Type.RegEx(/^\d{8}(?:[-\s]\d{4})?$/),
		phone: Type.String({ minLength: 9, maxLength: 9 }),
		address: Type.String(),
		avatar: Type.Optional(Type.String()),
		birthDate: Type.String(),
	},
	{
		additionalProperties: false,
	}
);
export type DealerRegisterType = Static<typeof DealerRegister>;
