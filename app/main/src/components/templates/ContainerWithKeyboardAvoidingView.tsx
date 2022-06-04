import React, {FC} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {ScrollDiv} from 'react-native-magnus';

interface Props {}

export const ContainerWithKeyboardAvoidingView: FC<Props> = ({children}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollDiv>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </ScrollDiv>
    </KeyboardAvoidingView>
  );
};
