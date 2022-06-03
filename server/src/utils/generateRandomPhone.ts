import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('0123456789', 9);

/**
 * Useful for phone
 */
export const generateRandomPhone = (): string => {
	return nanoid(9);
};
