import {customAlphabet} from 'nanoid';

const nanoid = customAlphabet('1234567890ABCDEFGHIJ', 10);

/**
 * Useful for coupons codes
 */
export const generateRandomId = (): string => {
  return nanoid(10);
};
