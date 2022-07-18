import React, {FC} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {ScrollDiv} from 'react-native-magnus';
import {ContainerWithCredits} from './ContainerWithCredits';

interface Props {}

export const ContainerWithCreditsAndKeyboardAvoidingView: FC<Props> = ({
  children,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollDiv>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ContainerWithCredits>{children}</ContainerWithCredits>
        </TouchableWithoutFeedback>
      </ScrollDiv>
    </KeyboardAvoidingView>
  );
};
