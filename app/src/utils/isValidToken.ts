export const isValidToken = (token: string) => {
  return token.split('.').length === 3;
};
