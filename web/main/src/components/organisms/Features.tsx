import {FC} from 'react';
import {Feature} from '../molecules/Feature';
import {features} from 'constants/features.constants';

interface Props {}

export const Features: FC<Props> = () => {
  return (
    <div className="w-full my-28" id="features">
      <div className="px-1 mx-auto max-w-7xl sm:px-3 lg:px-6">
        <h3 className="text-4xl font-bold text-center">Características</h3>
        <p className="max-w-2xl mx-auto mt-6 text-lg text-center text-gray-700">
          <span className="text-primary-500">Fastly</span> está repleto de
          muchas características que te permitirán tener una mejor experiencia
          de punto a punto, además de las que mostramos aquí, hay
          características misteriosas que irás descubriéndolas a través de la
          aplicación.
        </p>
        <div className="grid grid-cols-2 my-16 gap-x-16 gap-y-8 md:grid-cols-3">
          {features.map((feature, key) => (
            <Feature key={key.toString()} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};
