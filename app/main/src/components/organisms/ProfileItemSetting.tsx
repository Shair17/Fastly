import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {Div, Text, Icon, useTheme} from 'react-native-magnus';

interface Props {
  onPress: () => void;
  activeOpacity?: number;
  iconName: string;
  text: string;
}

export const ProfileItemSetting: FC<Props> = ({
  onPress,
  activeOpacity = 0.7,
  iconName,
  text,
}) => {
  const {theme} = useTheme();
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={activeOpacity}>
      <Div row alignItems="center" justifyContent="space-between">
        <Div row>
          <Icon
            fontFamily="Ionicons"
            name={iconName}
            color="text"
            bg={theme.name === 'light' ? 'gray100' : 'gray900'}
            p={10}
            rounded="2xl"
            fontSize="2xl"
            mr="lg"
          />
          <Text fontWeight="600" fontSize="xl">
            {text}
          </Text>
        </Div>
        <Icon
          fontFamily="Ionicons"
          name="chevron-forward"
          color="text"
          fontSize="2xl"
        />
      </Div>
    </TouchableOpacity>
  );
};
