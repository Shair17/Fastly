import {UUID_REGEX} from '@fastly/constants/regex.constants';

export const isUUID = (val: unknown): boolean =>
  typeof val === 'string' && UUID_REGEX.test(val);

export const isFunction = (val: unknown): boolean => typeof val === 'function';

export const isString = (val: unknown): boolean => typeof val === 'string';
