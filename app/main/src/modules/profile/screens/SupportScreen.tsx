import React from 'react';
import {TouchableOpacity, ScrollView} from 'react-native';
import {Div, Text, Icon, Image} from 'react-native-magnus';
import {ContactItem} from '../../../components/organisms/ContactItem';
import {HeaderScreen} from '../../../components/organisms/HeaderScreen';
import {useUserStore} from '../../../stores/useUserStore';
import {openLink} from '../../../utils/openLink';
import {
  FASTLY_FACEBOOK,
  FASTLY_INSTAGRAM,
  FASTLY_WHATSAPP,
  FASTLY_WEB,
  SHAIR_CONTACTO,
  SHAIR_EMAIL,
  SHAIR_FACEBOOK,
  SHAIR_INSTAGRAM,
  SHAIR_WEB,
  FASTLY_SUPPORT_EMAIL,
  SHAIR_WHATSAPP,
} from '../../../constants/support.constants';
import {useClipboard} from '@react-native-clipboard/clipboard';
import {Notifier, NotifierComponents} from 'react-native-notifier';

const supportImageBackground = require('../../../assets/images/support/support-bg.png');

export const SupportScreen = ({navigation}: any) => {
  const [data, setString] = useClipboard();

  const name = useUserStore(user => user.name);
  const firstName = name.split(' ')[0];

  const goBack = () => {
    navigation.goBack();
  };

  const handleCopyEmail = (email: string) => {
    setString(email);

    Notifier.showNotification({
      // title: 'Portapapeles',
      description: `El correo ${email} ha sido copiado al portapapeles`,
      Component: NotifierComponents.Alert,
      componentProps: {
        alertType: 'info',
      },
    });
  };

  return (
    <Div flex={1} bg="body">
      <HeaderScreen
        left={
          <TouchableOpacity onPress={goBack} activeOpacity={0.7}>
            <Icon
              fontFamily="Ionicons"
              name="arrow-back"
              fontSize="xl"
              color="text"
            />
          </TouchableOpacity>
        }
        middle={
          <Text fontWeight="bold" fontSize="xl">
            Soporte
          </Text>
        }
      />
      <ScrollView>
        <Div p="2xl">
          <Div h={200}>
            <Image
              flex={1}
              source={supportImageBackground}
              resizeMode="contain"
            />
          </Div>
          <Div>
            <Div mt="md">
              <Text
                fontWeight="bold"
                fontSize="2xl"
                color="text"
                textAlign="left">
                Hola{' '}
                <Text fontWeight="bold" fontSize="2xl" color="secondary">
                  {firstName}
                </Text>
                , estamos aquí para ayudarte.
              </Text>
            </Div>

            <Div mt="2xl">
              <Div mb="lg">
                <Text textAlign="left" fontWeight="600" fontSize="lg" mb="md">
                  Redes Sociales de Fastly
                </Text>

                <ContactItem
                  iconName="logo-whatsapp"
                  title="WhatsApp"
                  description="+51 966107266"
                  onPress={() => openLink(FASTLY_WHATSAPP)}
                />

                <ContactItem
                  iconName="logo-facebook"
                  title="Facebook"
                  description="@fastlyapp"
                  onPress={() => openLink(FASTLY_FACEBOOK)}
                />

                <ContactItem
                  iconName="logo-instagram"
                  title="Instagram"
                  description="@fastly.pe"
                  onPress={() => openLink(FASTLY_INSTAGRAM)}
                />

                <ContactItem
                  iconName="earth"
                  title="Web"
                  description="https://fastly.delivery"
                  onPress={() => openLink(FASTLY_WEB)}
                />
              </Div>

              <Div mb="lg">
                <Text textAlign="left" fontWeight="600" fontSize="lg" mb="md">
                  Redes Sociales del Desarrollador
                </Text>

                <ContactItem
                  iconName="logo-whatsapp"
                  title="WhatsApp"
                  description="+51 966107266"
                  onPress={() => openLink(SHAIR_WHATSAPP)}
                />

                <ContactItem
                  iconName="logo-facebook"
                  title="Facebook"
                  description="@shair17"
                  onPress={() => openLink(SHAIR_FACEBOOK)}
                />

                <ContactItem
                  iconName="logo-instagram"
                  title="Instagram"
                  description="@shair.dev"
                  onPress={() => openLink(SHAIR_INSTAGRAM)}
                />

                <ContactItem
                  iconName="earth"
                  title="Web"
                  description="https://shair.dev"
                  onPress={() => openLink(SHAIR_WEB)}
                />
              </Div>

              <Text>
                Si deseas ponerte en contacto con{' '}
                <Text fontWeight="bold" color="primary">
                  Fastly
                </Text>{' '}
                mediante correo electrónico, considera escribirnos a{' '}
                <Text
                  fontWeight="bold"
                  color="secondary"
                  onPress={() => handleCopyEmail(FASTLY_SUPPORT_EMAIL)}>
                  {FASTLY_SUPPORT_EMAIL}
                </Text>
                .
              </Text>

              <Text mt="md">
                También puedes ponerte en contacto con el desarrollador de
                Fastly,{' '}
                <Text fontWeight="bold" color="primary">
                  Shair
                </Text>
                , mediante correo electrónico, escribe a{' '}
                <Text
                  fontWeight="bold"
                  color="secondary"
                  onPress={() => handleCopyEmail(SHAIR_EMAIL)}>
                  {SHAIR_EMAIL}
                </Text>{' '}
                o accediendo a{' '}
                <Text
                  fontWeight="bold"
                  color="secondary"
                  onPress={() => openLink(SHAIR_CONTACTO)}>
                  su sitio web oficial
                </Text>
                .
              </Text>
            </Div>

            <Div my="xl" />
          </Div>
        </Div>
      </ScrollView>
    </Div>
  );
};
