export const calcAgeFromDate = (date: Date): number => {
  const birthday = +new Date(date);

  return ~~((Date.now() - birthday) / 31557600000);
};
