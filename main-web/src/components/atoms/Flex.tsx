import {FC} from 'react';
import c from 'clsx';
import {DivProps} from 'react-html-props';

type FLEX_DIR = 'row' | 'row-reverse' | 'col' | 'col-reverse';
type FLEX_WRAP = 'wrap' | 'wrap-reverse' | 'nowrap';
type FLEX = '1' | 'auto' | 'initial' | 'none';
type FLEX_GROW = 'grow-0' | 'grow';
type FLEX_SHRINK = 'shrink-0' | 'shrink';
type ORDER =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | 'first'
  | 'last'
  | 'none';
type JUSTIFY_CONTENT =
  | 'start'
  | 'end'
  | 'center'
  | 'between'
  | 'around'
  | 'evenly';
type ALIGN_CONTENT =
  | 'center'
  | 'start'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly';
type ALIGN_ITEMS = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
type ALIGN_SELF = 'auto' | 'start' | 'end' | 'center' | 'stretch';

// Thanks to https://gist.github.com/mfal/88fe927f2061d22425cc78fcec8d260f
// OR, we can use `react-html-props` package instead 😎
interface Props extends DivProps {
  flexDir?: FLEX_DIR;
  flexWrap?: FLEX_WRAP;
  flex?: FLEX;
  flexGrow?: FLEX_GROW;
  flexShrink?: FLEX_SHRINK;
  order?: ORDER;
  justifyContent?: JUSTIFY_CONTENT;
  alignContent?: ALIGN_CONTENT;
  alignItems?: ALIGN_ITEMS;
  alignSelf?: ALIGN_SELF;
  as?: keyof JSX.IntrinsicElements;
}

export const Flex: FC<Props> = ({
  flexDir,
  flexWrap,
  flex,
  flexGrow,
  flexShrink,
  order,
  justifyContent,
  alignContent,
  alignItems,
  alignSelf,

  as: Component = 'div',

  children,
  ...rest
}) => {
  const classes = c(
    // Flex class
    'flex',

    // Flex Direction
    {'flex-row': flexDir === 'row'},
    {'flex-row-reverse': flexDir === 'row-reverse'},
    {'flex-col': flexDir === 'col'},
    {'flex-col-reverse': flexDir === 'col-reverse'},

    // Flex Wrap
    {'flex-wrap': flexWrap === 'wrap'},
    {'flex-wrap-reverse': flexWrap === 'wrap-reverse'},
    {'flex-nowrap': flexWrap === 'nowrap'},

    // Flex | not `display: flex;`
    {'flex-1': flex === '1'},
    {'flex-auto': flex === 'auto'},
    {'flex-initial': flex === 'initial'},
    {'flex-none': flex === 'none'},

    // Flex Grow
    {'flex-grow-0': flexGrow === 'grow-0'},
    {'flex-grow': flexGrow === 'grow'},

    // Flex Shrink
    {'flex-shrink-0': flexShrink === 'shrink-0'},
    {'flex-shrink': flexShrink === 'shrink'},

    // Flex Order
    {'order-1': order === '1'},
    {'order-2': order === '2'},
    {'order-3': order === '3'},
    {'order-4': order === '4'},
    {'order-5': order === '5'},
    {'order-6': order === '6'},
    {'order-7': order === '7'},
    {'order-8': order === '8'},
    {'order-9': order === '9'},
    {'order-10': order === '10'},
    {'order-11': order === '11'},
    {'order-12': order === '12'},
    {'order-first': order === 'first'},
    {'order-last': order === 'last'},
    {'order-none': order === 'none'},

    // Flex Justify Content
    {'justify-start': justifyContent === 'start'},
    {'justify-end': justifyContent === 'end'},
    {'justify-center': justifyContent === 'center'},
    {'justify-between': justifyContent === 'between'},
    {'justify-around': justifyContent === 'around'},
    {'justify-evenly': justifyContent === 'evenly'},

    // Flex Align Content
    {'content-center': alignContent === 'center'},
    {'content-start': alignContent === 'start'},
    {'content-end': alignContent === 'end'},
    {'content-between': alignContent === 'between'},
    {'content-around': alignContent === 'around'},
    {'content-evenly': alignContent === 'evenly'},

    // Flex Align Items
    {'items-start': alignItems === 'start'},
    {'items-end': alignItems === 'end'},
    {'items-center': alignItems === 'center'},
    {'items-baseline': alignItems === 'baseline'},
    {'items-stretch': alignItems === 'stretch'},

    // Flex Align Self
    {'self-auto': alignSelf === 'auto'},
    {'self-start': alignSelf === 'start'},
    {'self-end': alignSelf === 'end'},
    {'self-center': alignSelf === 'center'},
    {'self-stretch': alignSelf === 'stretch'},

    // rest of className passed by props as simple string | strings
    rest.className,
  );

  const {className, ...props} = rest;

  const ACompontent = Component as any;

  return (
    <ACompontent className={classes} {...props}>
      {children}
    </ACompontent>
  );
};
