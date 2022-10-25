import {FC} from 'react';
import {Feature} from '../molecules/Feature';
import {features} from 'constants/features.constants';

export const Features: FC = () => {
  return (
    <div className="my-28 w-full" id="features">
      <div className="mx-auto max-w-7xl px-1 sm:px-3 lg:px-6">
        <h2 className="text-center text-4xl font-bold">Características</h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-gray-700">
          <span className="text-primary-500">Fastly</span> está repleto de
          muchas características que te permitirán tener una mejor experiencia
          de punto a punto, además de las que mostramos aquí, hay
          características misteriosas que irás descubriéndolas a través de la
          aplicación.
        </p>
        <div className="my-16 grid grid-cols-2 gap-x-16 gap-y-8 md:grid-cols-3">
          {features.map((feature, key) => (
            <Feature key={key.toString()} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};
