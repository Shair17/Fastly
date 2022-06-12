import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Div, Text, Icon} from 'react-native-magnus';
import {HeaderScreen} from '../../../components/organisms/HeaderScreen';
import {ContainerWithCredits} from '../../../components/templates/ContainerWithCredits';
import {ProfileStackParams} from '../ProfileStackParams.type';

interface Props
  extends NativeStackScreenProps<ProfileStackParams, 'MyAddresses'> {}

export const MyAddressesScreen: FC<Props> = ({navigation}) => {
  const goBack = () => {
    // navigation.push('Profile');
    navigation.replace('Profile');
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
            Direcciones
          </Text>
        }
      />
      <Div p="2xl"></Div>
    </ContainerWithCredits>
  );
};
