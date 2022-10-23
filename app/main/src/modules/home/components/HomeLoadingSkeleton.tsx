import React, {Fragment} from 'react';
import {Div} from 'react-native-magnus';
import {Skeleton} from '@fastly/components/atoms/Skeleton';

const CategoriesSection = () => {
  return (
    <Div>
      <Div mb="xl">
        <Skeleton.Box rounded="md" h={20} w="50%" />
      </Div>
      <Div row justifyContent="space-between" mb="lg">
        <Skeleton.Circle h={100} w={100} />
        <Skeleton.Circle h={100} w={100} />
        <Skeleton.Circle h={100} w={100} />
      </Div>
      <Div row justifyContent="space-between">
        <Skeleton.Circle h={100} w={100} />
        <Skeleton.Circle h={100} w={100} />
        <Skeleton.Circle h={100} w={100} />
      </Div>
    </Div>
  );
};

const Section = () => {
  return (
    <Div>
      <Div mb="xl">
        <Skeleton.Box rounded="md" h={20} w="50%" />
      </Div>
      <Skeleton.Box h={150} rounded="md" />
    </Div>
  );
};

export const HomeLoadingSkeleton: React.FC = () => {
  return (
    <Fragment>
      <Skeleton.Box h={200} rounded="md" />
      <Div my="lg" />
      <CategoriesSection />
      <Div my="lg" />
      <Section />
      <Div my="lg" />
      <Section />
      <Div my="lg" />
      <Section />
      <Div my="lg" />
      <Section />
      <Div my="lg" />
      <Section />
    </Fragment>
  );
};
