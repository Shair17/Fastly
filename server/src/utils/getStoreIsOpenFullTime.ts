import {isDate} from './index';

export const getStoreIsOpenFullTime = (openTime?: Date, closeTime?: Date) => {
  return isDate(openTime) || isDate(closeTime);
};
