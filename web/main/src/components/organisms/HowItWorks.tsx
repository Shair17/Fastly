import {FC} from 'react';
import {howItWorks} from 'constants/how-it-works.constants';
import {HowItWorksItem} from '../molecules/HowItWorksItem';

interface Props {}

export const HowItWorks: FC<Props> = () => {
  return (
    <div className="w-full my-28" id="how-it-works">
      <div className="px-1 mx-auto max-w-7xl sm:px-3 lg:px-6">
        <h2 className="text-4xl font-bold text-center">Cómo Funciona</h2>
        <div className="grid grid-cols-1 gap-20 my-16 md:grid-cols-2">
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
