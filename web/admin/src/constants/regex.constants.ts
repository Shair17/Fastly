// Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character
// Mínimo ocho caracteres, al menos una letra mayúscula en inglés, una letra minúscula en inglés, un número y un carácter especial
export const PASSWORD_REGEX =
	/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

export const JWT_REGEX =
	/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;

export const EMAIL_REGEX = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

export const DNI_REGEX = /^\d{8}(?:[-\s]\d{4})?$/;
