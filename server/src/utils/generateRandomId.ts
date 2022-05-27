import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890ABCDEFGHIJ', 10);

export const generateRandomId = () => {
	return nanoid(10);
};
