import { Static, Type } from '@sinclair/typebox';

// Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character
// Mínimo ocho caracteres, al menos una letra mayúscula en inglés, una letra minúscula en inglés, un número y un carácter especial
const PASSWORD_REGEX =
	/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

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
		password: Type.RegEx(PASSWORD_REGEX),
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
		password: Type.RegEx(PASSWORD_REGEX),
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
export const ChangeAdminPassword = Type.Object(
	{
		oldPassword: Type.RegEx(PASSWORD_REGEX),
		newPassword: Type.RegEx(PASSWORD_REGEX),
	},
	{
		additionalProperties: false,
	}
);
export type ChangeAdminPasswordType = Static<typeof ChangeAdminPassword>;

// customer
export const CustomerLogin = Type.Object(
	{
		email: Type.String({ format: 'email' }),
		password: Type.RegEx(PASSWORD_REGEX),
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
		password: Type.RegEx(PASSWORD_REGEX),
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
export const ChangeCustomerPassword = Type.Object(
	{
		oldPassword: Type.RegEx(PASSWORD_REGEX),
		newPassword: Type.RegEx(PASSWORD_REGEX),
	},
	{
		additionalProperties: false,
	}
);
export type ChangeCustomerPasswordType = Static<typeof ChangeCustomerPassword>;

// dealer
export const DealerLogin = Type.Object(
	{
		email: Type.String({ format: 'email' }),
		password: Type.RegEx(PASSWORD_REGEX),
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
		password: Type.RegEx(PASSWORD_REGEX),
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
export const ChangeDealerPassword = Type.Object(
	{
		oldPassword: Type.RegEx(PASSWORD_REGEX),
		newPassword: Type.RegEx(PASSWORD_REGEX),
	},
	{
		additionalProperties: false,
	}
);
export type ChangeDealerPasswordType = Static<typeof ChangeDealerPassword>;
