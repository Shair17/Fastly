export const buildFacebookUri = (
  accessToken: string,
  // userID: string
): string => {
  // return `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;

  return `https://graph.facebook.com/me?access_token=${accessToken}`;
};
