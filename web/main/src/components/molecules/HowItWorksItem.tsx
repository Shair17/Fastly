import {FC} from 'react';

interface Props {
  step: string;
  title: string;
  description: string;
}

export const HowItWorksItem: FC<Props> = ({step, title, description}) => {
  return (
    <div className="flex flex-col items-center justify-center px-2 space-y-2 text-center">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-50">
        <span className="font-bold text-center text-primary-500">{step}</span>
      </div>
      <h4 className="text-xl font-bold">{title}</h4>
      <p className="text-base text-gray-600">{description}</p>
    </div>
  );
};
