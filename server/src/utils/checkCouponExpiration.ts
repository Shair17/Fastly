import {isDate} from '.';

export const checkCouponExpiration = (couponExpiration?: Date) => {
  if (isDate(couponExpiration)) {
    const expiration = new Date(couponExpiration);

    return expiration > new Date();
  }

  console.log('el cupon no tiene fecha de expiracion');

  return false;
};
