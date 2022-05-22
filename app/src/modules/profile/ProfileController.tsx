import React, {FC, useEffect} from 'react';
import {Div, Text, Image, Icon} from 'react-native-magnus';
// import {Skeleton} from '../../components/atoms/Skeleton';
import {ProfileScreenProps} from '../../navigation/screens/app/ProfileScreen';
import {ThemeSwitcher} from '../../components/atoms/ThemeSwitcher';

import {http} from '../../services/http.service';

const avatar = require('../../assets/images/avatar-placeholder.jpg');

export const ProfileController: FC<ProfileScreenProps> = () => {
  useEffect(() => {
    http
      .get('/users/me')
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <Div flex={1} bg="body">
      <Div p="2xl">
        <Div row>
          <Div>
            <Div shadow="sm" w={100} h={100} rounded="circle">
              <Image
                flex={1}
                rounded="circle"
                borderColor="#fff"
                borderWidth={4}
                source={avatar}
              />
            </Div>
          </Div>

          <Div mx="md" />

          <Div flex={1} alignSelf="center" alignItems="flex-start">
            <Text fontWeight="bold" fontSize="3xl">
              Jimmy Morales
            </Text>
            <Text>@shair17</Text>
          </Div>
        </Div>

        <Div my="lg" />

        <Div>
          <Div row>
            <Icon fontFamily="Ionicons" name="location" fontSize="lg" />
            <Text fontSize="lg" ml="md">
              Chepén, La Libertad, Perú.
            </Text>
          </Div>

          <Div my="xs" />

          <Div row>
            <Icon fontFamily="Ionicons" name="phone-portrait" fontSize="lg" />
            <Text fontSize="lg" ml="md">
              +51 966107266
            </Text>
          </Div>

          <Div my="xs" />

          <Div row>
            <Icon fontFamily="Ionicons" name="mail" fontSize="lg" />
            <Text fontSize="lg" ml="md">
              jimmy_jhair17@outlook.es
            </Text>
          </Div>
        </Div>
      </Div>
    </Div>
  );
};
