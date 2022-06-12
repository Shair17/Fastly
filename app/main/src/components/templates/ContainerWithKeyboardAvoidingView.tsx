import React, {FC} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {ScrollDiv} from 'react-native-magnus';

interface Props {
  flexFull?: boolean;
}

export const ContainerWithKeyboardAvoidingView: FC<Props> = ({
  children,
  flexFull = false,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={flexFull ? {flex: 1} : undefined}>
      {flexFull ? (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex: 1}}>
          {children}
        </TouchableWithoutFeedback>
      ) : (
        <ScrollDiv>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {children}
          </TouchableWithoutFeedback>
        </ScrollDiv>
      )}
    </KeyboardAvoidingView>
  );
};
