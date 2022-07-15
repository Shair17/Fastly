export const checkCouponExpiration = (couponExpiration?: Date) => {
  if (couponExpiration) {
    const expiration = new Date(couponExpiration);
    const now = new Date();

    return expiration > now;
  }

  console.log('el cupon no tiene fecha de expiracion');

  return false;
};
