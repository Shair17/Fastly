import {ButtonProps} from 'react-html-props';

// interface Props extends ButtonProps {}

export const Button = (props: ButtonProps) => {
  return <button {...props} />;
};
