import {FC} from 'react';

interface Props {
  step: string;
  title: string;
  description: string;
}

export const HowItWorksItem: FC<Props> = ({step, title, description}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 px-2 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50">
        <span className="text-center font-bold text-primary-500">{step}</span>
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-base text-gray-600">{description}</p>
    </div>
  );
};
