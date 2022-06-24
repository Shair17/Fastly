import React, {useState, FC, Fragment} from 'react';
import {StatusBar, SafeAreaView, ScrollView} from 'react-native';
import {Div, Text, Image, Icon} from 'react-native-magnus';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {AnimatedObject} from '../../components/atoms/AnimatedObject';
import {Button} from '../../components/atoms/Button';
import {FooterLegalLinks} from '../../components/molecules/FooterLegalLinks';
import {OverlayLoading} from '../../components/molecules/OverlayLoading';
import {objectsImages} from './objectImages';
import {useAuthStore} from '../../stores/useAuthStore';
import {useUserStore} from '../../stores/useUserStore';
import {ContainerWithCredits} from '../../components/templates/ContainerWithCredits';
import {AuthenticationScreenProps} from '../../navigation/screens/AuthenticationScreen';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import useAxios from 'axios-hooks';

const authenticationBackgroundImage = require('../../assets/images/authentication/background.jpg');
const logoImage = require('../../assets/images/fastly@1000x1000.png');

export const AuthenticationController: FC<AuthenticationScreenProps> = () => {
  const [{loading, error}, executeLogInWithFacebook] = useAxios(
    {
      url: '/auth/facebook',
      method: 'POST',
    },
    {manual: true},
  );
  const [overlayVisible, setOverlayVisible] = useState<boolean>(false);
  const setTokens = useAuthStore(s => s.setTokens);
  const setIsNewUser = useAuthStore(s => s.setIsNewUser);
  const setUser = useUserStore(user => user.setUser);

  const loginWithFacebook = async () => {
    try {
      const {isCancelled} = await LoginManager.logInWithPermissions([
        'public_profile',
      ]);

      setOverlayVisible(true);

      if (isCancelled) {
        Notifier.showNotification({
          title: 'Error',
          description:
            'El inicio de sesión con Facebook fue cancelado por el usuario.',
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'warn',
          },
          containerStyle: {
            paddingTop: StatusBar.currentHeight,
          },
        });

        setOverlayVisible(false);
      } else {
        const user = await AccessToken.getCurrentAccessToken();

        if (user !== null) {
          const {accessToken, userID} = user;

          executeLogInWithFacebook({
            data: {
              accessToken,
              userID,
            },
          })
            .then(response => {
              Notifier.showNotification({
                title: 'Fastly',
                description:
                  'Inicio de sesión con éxito, estamos cargando tus datos...',
                Component: NotifierComponents.Alert,
                componentProps: {
                  alertType: 'success',
                },
                containerStyle: {
                  paddingTop: StatusBar.currentHeight,
                },
                duration: 1000,
                onHidden: () => {
                  setIsNewUser(response.data.user.isNewUser);
                  setUser(response.data.user);
                  setTokens({
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken,
                  });
                  setOverlayVisible(false);
                },
              });
            })
            .catch(e => {
              console.log(error);
              Notifier.showNotification({
                title: 'Error',
                description:
                  'Error al conectarse al servidor de Fastly, intenta nuevamente en unos minutos.',
                Component: NotifierComponents.Alert,
                componentProps: {
                  alertType: 'error',
                  backgroundColor: 'red',
                },
                containerStyle: {
                  paddingTop: StatusBar.currentHeight,
                },
              });
              setOverlayVisible(false);
            });
        } else {
          Notifier.showNotification({
            title: 'Error',
            description:
              'Los datos necesarios para iniciar sesión no fueron recibidos correctamente.',
            Component: NotifierComponents.Alert,
            componentProps: {
              alertType: 'warn',
            },
            containerStyle: {
              paddingTop: StatusBar.currentHeight,
            },
          });
          setOverlayVisible(false);
        }
      }
    } catch (error) {
      console.log(error);
      Notifier.showNotification({
        title: 'Error',
        description: 'Ocurrió un error al conectarse a la SDK de Facebook.',
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: 'error',
          backgroundColor: 'red',
        },
        containerStyle: {
          paddingTop: StatusBar.currentHeight,
        },
      });
      setOverlayVisible(false);
    }
  };

  return (
    <Fragment>
      <StatusBar translucent backgroundColor="transparent" />
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
                  h={50}
                  loading={loading}
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

      <OverlayLoading overlayVisible={overlayVisible && loading} />
    </Fragment>
  );
};
