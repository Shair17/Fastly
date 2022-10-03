export const buildFacebookUri = (accessToken: string): string =>
  `https://graph.facebook.com/me?access_token=${accessToken}`;
