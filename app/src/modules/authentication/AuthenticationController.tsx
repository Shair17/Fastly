import React, {useState, FC} from 'react';
import {StatusBar, SafeAreaView, ScrollView, Alert} from 'react-native';
import {Div, Text, Image, Icon} from 'react-native-magnus';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {AnimatedObject} from '../../components/atoms/AnimatedObject';
import {Button} from '../../components/atoms/Button';
import {FooterLegalLinks} from '../../components/molecules/FooterLegalLinks';
import {OverlayLoading} from '../../components/molecules/OverlayLoading';
import {objectsImages} from './objectImages';
import {useAuthStore} from '../../stores/useAuthStore';
import {ContainerWithCredits} from '../../components/templates/ContainerWithCredits';
import {AuthenticationScreenProps} from '../../navigation/screens/AuthenticationScreen';
import {AuthService} from '../../services/auth.service';

const authenticationBackgroundImage = require('../../assets/images/authentication/background.jpg');
const logoImage = require('../../assets/images/fastly@1000x1000.png');

export const AuthenticationController: FC<AuthenticationScreenProps> = () => {
  const [overlayVisible, setOverlayVisible] = useState<boolean>(false);
  const setTokens = useAuthStore(s => s.setTokens);

  StatusBar.setTranslucent(true);
  StatusBar.setBackgroundColor('transparent');

  const loginWithFacebook = async () => {
    try {
      const {isCancelled} = await LoginManager.logInWithPermissions([
        'public_profile',
      ]);

      setOverlayVisible(true);

      if (isCancelled) {
        Alert.alert(
          'Error',
          'El inicio de sesión con facebook fue cancelado por el usuario.',
        );

        setOverlayVisible(false);
      } else {
        const user = await AccessToken.getCurrentAccessToken();

        if (user !== null) {
          const {accessToken, userID} = user;

          try {
            const authService = new AuthService();

            // Should return {accessToken, refreshToken}
            const response = await authService.logInWithFacebook({
              accessToken,
              userID,
            });

            setTokens({
              accessToken: response.data.accessToken,
              refreshToken: response.data.refreshToken,
            });

            // set isNewUser here

            setOverlayVisible(false);
          } catch (e) {
            Alert.alert(
              'Error',
              'Error al conectarse al servidor de Fastly, intenta nuevamente en unos minutos.',
            );
            setOverlayVisible(false);
          }
        } else {
          Alert.alert(
            'Error',
            'Los datos necesarios para iniciar sesión no fueron reicibidos correctamente.',
          );
          setOverlayVisible(false);
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Error',
        'Ocurrió un error al conectarse a la SDK de facebook.',
      );
      setOverlayVisible(false);
    }
  };

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <ContainerWithCredits>
          <Div flex={4} bg="body">
            <Div
              flex={1}
              bgImg={authenticationBackgroundImage}
              shadow="xs"
              roundedBottomLeft={100}
              roundedBottomRight={100}>
              <Div flex={1} justifyContent="center" alignItems="center">
                <Div position="absolute" top={0} bottom={0} left={0} right={0}>
                  {objectsImages.map(({top, left, w, h, image}, key) => (
                    <Div
                      position="absolute"
                      top={top}
                      left={left}
                      key={key.toString()}>
                      <AnimatedObject w={w} h={h} image={image} />
                    </Div>
                  ))}
                </Div>
                <Div
                  bg="red100"
                  alignSelf="center"
                  w={150}
                  h={150}
                  shadow="md"
                  rounded="circle">
                  <Image
                    w={100}
                    h={100}
                    flex={1}
                    alignSelf="center"
                    resizeMode="contain"
                    source={logoImage}
                  />
                </Div>
              </Div>
            </Div>
          </Div>

          <Div flex={2} bg="body">
            <ScrollView>
              <Div px="2xl" flex={1}>
                <Div my="md" />
                <Text
                  textAlign="center"
                  color="text"
                  fontWeight="bold"
                  fontSize="6xl">
                  ¡Bienvenid@ a Fastly!
                </Text>

                <Div my="md" />

                <Button
                  block
                  bg="facebook"
                  fontWeight="bold"
                  fontSize="xl"
                  prefix={
                    <Icon
                      fontFamily="MaterialCommunityIcons"
                      name="facebook"
                      color="white"
                      mr="sm"
                      fontSize="5xl"
                    />
                  }
                  onPress={loginWithFacebook}>
                  Continuar con Facebook
                </Button>

                <Div my="md" />

                <FooterLegalLinks />
              </Div>
            </ScrollView>
          </Div>
        </ContainerWithCredits>
      </SafeAreaView>

      <OverlayLoading overlayVisible={overlayVisible} />
    </>
  );
};
