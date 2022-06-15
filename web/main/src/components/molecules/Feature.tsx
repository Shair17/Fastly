import {FC} from 'react';
import {Icon} from 'tabler-icons-react';

interface Props {
  Icon: Icon;
  title: string;
  description: string;
}

export const Feature: FC<Props> = ({Icon, title, description}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 text-center">
      <div className="self-center p-2 rounded-xl bg-primary-50">
        <Icon size={40} className="text-primary-500" />
      </div>
      <h4 className="text-xl font-bold">{title}</h4>
      <p className="text-base text-gray-600">{description}</p>
    </div>
  );
};
