import React, {FC} from 'react';
import {TouchableOpacity, ScrollView} from 'react-native';
import {Div, Text, Icon} from 'react-native-magnus';

interface Props {
  title: string;
  showSeeMore?: boolean;
  onSeeMore: () => void;
}

export const FeedCarousel: FC<Props> = ({
  title,
  showSeeMore = true,
  onSeeMore,
}) => {
  return (
    <Div>
      <Div row mb="md">
        <Div flex={1}>
          <Text fontWeight="bold" fontSize="4xl" color="text">
            {title}
          </Text>
        </Div>
        {showSeeMore && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onSeeMore}
            style={{justifyContent: 'center'}}>
            <Div
              row
              bg="red100"
              borderColor="primary"
              rounded="circle"
              alignSelf="center"
              px="sm"
              py="xs">
              <Text fontSize="xs" color="primary" mr={1}>
                Ver más
              </Text>
              <Icon
                fontFamily="Ionicons"
                name="arrow-forward-outline"
                color="primary"
                fontSize="xs"
              />
            </Div>
          </TouchableOpacity>
        )}
      </Div>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Div w={150} h={150} bg="lime200" rounded="md" mr="md" />
        <Div w={150} h={150} bg="emerald200" rounded="md" mr="md" />
        <Div w={150} h={150} bg="amber200" rounded="md" mr="md" />
        <Div w={150} h={150} bg="orange200" rounded="md" mr="md" />
        <Div w={150} h={150} bg="stone200" rounded="md" mr="md" />
        <Div w={150} h={150} bg="zinc200" rounded="md" mr="md" />
        <Div w={150} h={150} bg="slate200" rounded="md" mr="md" />
        <Div w={150} h={150} bg="green200" rounded="md" mr="md" />
        <Div w={150} h={150} bg="yellow200" rounded="md" mr="md" />
        <Div w={150} h={150} bg="red200" rounded="md" mr="md" />
        <Div w={150} h={150} bg="gray200" rounded="md" mr="md" />
        <Div w={150} h={150} bg="pink200" rounded="md" />
      </ScrollView>
    </Div>
  );
};
