import {isDate} from './date';

export const wait = (timeout: number = 1000) =>
  new Promise(resolve => setTimeout(resolve, timeout));

export const getStoreIsOpenFullTime = (openTime?: Date, closeTime?: Date) => {
  return isDate(openTime) || isDate(closeTime);
};
