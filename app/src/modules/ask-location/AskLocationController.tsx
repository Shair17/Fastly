import React, {FC} from 'react';
import {ScrollView} from 'react-native';
import {Div, Text, Icon, Radio} from 'react-native-magnus';
import {ContainerWithCredits} from '../../components/templates/ContainerWithCredits';
import {AskLocationScreenProps} from '../../navigation/screens/AskLocationScreen';
import {Map} from '../../components/atoms/Map';
import {defaultTags} from './defaultTags';
import {Button} from '../../components/atoms/Button';
import {useForm, Controller} from 'react-hook-form';

export const AskLocationController: FC<AskLocationScreenProps> = ({
  navigation,
}) => {
  const handleNext = () => {
    navigation.navigate('AskPersonalInformationScreen');
  };

  return (
    <ContainerWithCredits>
      <Div flex={1}>
        <Div p="2xl">
          <Div>
            <Text fontWeight="bold" fontSize="6xl" color="text">
              Establece tu primera dirección
            </Text>

            <Div my="md" />

            <Text color="text" textAlign="left" maxW="90%">
              Estás a un paso de disfrutar todos los beneficios que Fastly te
              otorga, solo agrega tu primera dirección para poder continuar.
            </Text>
          </Div>

          <Div my="lg" />

          <Div w="100%" h={200}>
            <Map />
          </Div>

          <Div my="lg" />

          <Div h={50}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              horizontal
              style={{
                flex: 1,
              }}
              contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Radio.Group
                row
                onChange={e => {
                  console.log(e);
                }}>
                {defaultTags.map((item, key) => (
                  <Radio value={item.id} key={key.toString()}>
                    {({checked}) => (
                      <Div
                        bg={checked ? 'secondary' : 'white'}
                        borderWidth={1}
                        borderColor={checked ? 'primary' : 'transparent'}
                        row
                        alignItems="center"
                        justifyContent="center"
                        px="lg"
                        py="md"
                        mr={key === defaultTags.length - 1 ? 0 : 'md'}
                        shadow="xs"
                        rounded="circle">
                        <Icon
                          name={item.icon}
                          // @ts-ignore
                          fontFamily={item.iconFontFamily}
                          fontSize="sm"
                          color={checked ? 'white' : 'gray800'}
                        />
                        <Text
                          color={checked ? 'white' : 'gray800'}
                          fontSize="sm"
                          ml="xs"
                          fontWeight="bold">
                          {item.name}
                        </Text>
                      </Div>
                    )}
                  </Radio>
                ))}
              </Radio.Group>
            </ScrollView>
          </Div>

          <Div my="md" />

          <Button
            block
            shadow="xs"
            fontWeight="bold"
            fontSize="2xl"
            onPress={handleNext}>
            Siguiente
          </Button>
        </Div>
      </Div>
    </ContainerWithCredits>
  );
};
