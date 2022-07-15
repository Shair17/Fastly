import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890', 8);

/**
 * Useful for DNI
 */
export const generateRandomDNI = (): string => {
  return nanoid(8);
};
