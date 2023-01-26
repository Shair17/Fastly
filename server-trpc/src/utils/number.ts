export const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const calcDecimalDiscount = (discount: number) => {
  if (discount >= 0 && discount <= 100) {
    if (discount === -0) return 0;

    return discount / 100;
  }

  console.log('discount es menor a 0 o mayor a 100');

  return 0;
};
