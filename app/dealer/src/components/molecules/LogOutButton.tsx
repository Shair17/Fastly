import React from 'react';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next';
import {Icon} from 'react-native-magnus';
import {useAuthStore} from '@fastly/stores/useAuthStore';
import {Button} from '../atoms/Button';

export const LogOutButton = () => {
  const removeTokens = useAuthStore(u => u.removeTokens);
  const logOutFromFastly = useAuthStore(u => u.logOutFromFastly);
  const FBLogout = async () => {
    try {
      let tokenObj = await AccessToken.getCurrentAccessToken();
      let current_access_token = tokenObj?.accessToken.toString();
      let logout = new GraphRequest(
        'me/permissions/',
        {
          accessToken: current_access_token,
          httpMethod: 'DELETE',
        },
        (error, result) => {
          if (error) {
            console.log('Error fetching data: ' + error.toString());
          } else {
            LoginManager.logOut();
          }
        },
      );
      new GraphRequestManager().addRequest(logout).start();
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = async () => {
    await FBLogout();
    await logOutFromFastly();
    removeTokens();
  };

  return (
    <Button
      block
      bg="white"
      fontWeight="600"
      borderWidth={1}
      rounded="xl"
      borderColor="red500"
      color="red500"
      underlayColor="red100"
      onPress={logOut}
      prefix={
        <Icon
          fontFamily="Ionicons"
          name="log-out-outline"
          mr="sm"
          fontSize="xl"
          color="red500"
        />
      }>
      Cerrar Sesión
    </Button>
  );
};
