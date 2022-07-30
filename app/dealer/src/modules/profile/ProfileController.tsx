import React from 'react';
import {Div, Text} from 'react-native-magnus';
import {ProfileStackProps} from '@fastly/navigation/stacks/profile';

export const ProfileController: React.FC<ProfileStackProps> = () => {
  return (
    <Div>
      <Text>ProfileController</Text>
    </Div>
  );
};
