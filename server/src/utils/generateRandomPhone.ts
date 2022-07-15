import { customAlphabet } from 'nanoid';
import { replaceAt } from './replaceAt';

const nanoid = customAlphabet('0123456789', 9);

/**
 * Useful for phone
 */
export const generateRandomPhone = (): string => {
	const random = nanoid(9);

	return replaceAt(random, 0, '9');
};
