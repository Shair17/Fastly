import {FC} from 'react';
import {SVGProps} from 'react-html-props';

export const CircleBackgroundIcon: FC<SVGProps> = props => {
  return (
    <svg fill="currentColor" viewBox="0 0 8 8" {...props}>
      <circle cx="4" cy="4" r="3"></circle>
    </svg>
  );
};
