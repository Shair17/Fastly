import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Div, Text, Icon} from 'react-native-magnus';
import {HeaderScreen} from '../../../components/organisms/HeaderScreen';
import {ContainerWithCredits} from '../../../components/templates/ContainerWithCredits';

export const EditProfileScreen = ({navigation}: any) => {
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ContainerWithCredits>
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
            Editar Perfil
          </Text>
        }
      />
      <Div p="2xl"></Div>
    </ContainerWithCredits>
  );
};
