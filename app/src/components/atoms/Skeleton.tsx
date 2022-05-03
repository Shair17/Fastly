import React, {FC} from 'react';
import {
  Skeleton as MagnusSkeleton,
  SkeletonProps as MagnusSkeletonProps,
  useTheme,
} from 'react-native-magnus';

interface SkeletonProps extends MagnusSkeletonProps {}

interface SkeletonSubComponents {
  Box: FC<SkeletonProps>;
  Circle: FC<SkeletonProps>;
}

const Box: FC<SkeletonProps> = props => {
  const {theme} = useTheme();

  return (
    <MagnusSkeleton.Box
      bg={theme.name === 'light' ? 'gray200' : 'zinc800'}
      {...props}
    />
  );
};

const Circle: FC<SkeletonProps> = props => {
  const {theme} = useTheme();

  return (
    <MagnusSkeleton.Circle
      bg={theme.name === 'light' ? 'gray200' : 'zinc800'}
      {...props}
    />
  );
};

export const Skeleton: FC<{}> & SkeletonSubComponents = props => {
  const {theme} = useTheme();

  return (
    <MagnusSkeleton.Box
      bg={theme.name === 'light' ? 'gray200' : 'zinc800'}
      {...props}
    />
  );
};

Skeleton.Box = Box;
Skeleton.Circle = Circle;
