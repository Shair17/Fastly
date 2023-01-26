export const buildFacebookApiUri = (accessToken: string): string => {
  return `https://graph.facebook.com/me?access_token=${accessToken}`;
};
