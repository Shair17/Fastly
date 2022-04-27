export const wait = (timeout: number = 1000) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
