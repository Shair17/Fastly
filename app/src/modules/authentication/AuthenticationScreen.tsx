import React, {useState, FC} from 'react';
import {StatusBar, SafeAreaView, ScrollView} from 'react-native';
import {Div, Text, Image, Icon} from 'react-native-magnus';
import {AnimatedObject} from '../../components/atoms/AnimatedObject';
import {Button} from '../../components/atoms/Button';
import {CreatedByShair} from '../../components/molecules/CreatedByShair';
import {FooterLegalLinks} from '../../components/molecules/FooterLegalLinks';
import {OverlayLoading} from '../../components/molecules/OverlayLoading';
import {objectsImages} from './objectImages';
import {useAuthStore} from '../../stores/useAuthStore';

interface Props {}

const authenticationBackgroundImage = require('../../assets/images/authentication/background.jpg');
const logoImage = require('../../assets/images/fastly@1000x1000.png');

export const AuthenticationScreen: FC<Props> = () => {
  const [overlayVisible, setOverlayVisible] = useState<boolean>(false);
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const setAuth = useAuthStore(s => s.setAuth);

  StatusBar.setTranslucent(true);
  StatusBar.setBackgroundColor('transparent');

  const loginWithFacebook = () => {
    setAuth({
      accessToken: 'some-access-token',
      refreshToken: 'some-refresh-token',
      isAuthenticated: true,
      isNewUser: true,
      user: {},
    });
  };

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Div flex={1} bg="body">
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

            <CreatedByShair />
          </Div>
        </Div>
      </SafeAreaView>

      <OverlayLoading overlayVisible={overlayVisible} />
    </>
  );
};
