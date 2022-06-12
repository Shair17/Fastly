import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {Div, Text, Icon} from 'react-native-magnus';
import {Input} from '../../../components/atoms/Input';
import {ContainerWithKeyboardAvoidingView} from '../../../components/templates/ContainerWithKeyboardAvoidingView';

interface Props {}

export const SearchScreen: FC<Props> = () => {
  return (
    <ContainerWithKeyboardAvoidingView flexFull>
      <Div bg="body" flex={1}>
        <Div p="xl">
          <Div>
            <Input
              placeholder="Buscar"
              fontSize="xl"
              autoCapitalize="none"
              autoFocus
              clearButtonMode="always"
              clearTextOnFocus
              returnKeyType="search"
              prefix={
                <Icon fontFamily="Ionicons" fontSize="xl" name="search" />
              }
            />
            <Div
              position="absolute"
              right={0}
              h="100%"
              p="lg"
              justifyContent="center">
              <TouchableOpacity onPress={() => console.log('clear')}>
                <Icon fontFamily="Ionicons" name="close" fontSize="xl" />
              </TouchableOpacity>
            </Div>
          </Div>
        </Div>
        <Text>SearchScreen</Text>
      </Div>
    </ContainerWithKeyboardAvoidingView>
  );
};
