import {FC} from 'react';
import {howItWorks} from 'constants/how-it-works.constants';
import {HowItWorksItem} from '../molecules/HowItWorksItem';

export const HowItWorks: FC = () => {
  return (
    <div className="my-28 w-full" id="how-it-works">
      <div className="mx-auto max-w-7xl px-1 sm:px-3 lg:px-6">
        <h2 className="text-center text-4xl font-bold">Cómo Funciona</h2>
        <div className="my-16 grid grid-cols-1 gap-20 md:grid-cols-2">
          {howItWorks.map((hiw, key) => (
            <HowItWorksItem
              key={key.toString()}
              step={(key + 1).toString()}
              {...hiw}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
