import {toTypeString} from './string';

export const calcAgeFromDate = (date: Date): number => {
  const birthday = +new Date(date);

  return ~~((Date.now() - birthday) / 31557600000);
};

export const isDate = (val: unknown): val is Date =>
  toTypeString(val) === '[object Date]';

export const checkCouponExpiration = (couponExpiration?: Date) => {
  if (isDate(couponExpiration)) {
    const expiration = new Date(couponExpiration);

    return expiration > new Date();
  }

  console.log('el cupon no tiene fecha de expiracion');

  return false;
};
