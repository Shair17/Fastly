import {FC} from 'react';
import {Testimonial} from '../molecules/Testimonial';
import {testimonials} from 'constants/testimonials.constants';

export const Testimonials: FC = () => {
  return (
    <div className="my-28 w-full" id="testimonials">
      <div className="mx-auto max-w-7xl px-1 sm:px-3 lg:px-6">
        <h2 className="text-center text-4xl font-bold">Testimonios</h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-gray-700">
          Estos son algunos testimonios de las personan sobre{' '}
          <span className="text-primary-500">Fastly</span>.
        </p>
        <div className="my-16 grid grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {testimonials.map((testimonial, key) => (
            <Testimonial key={key.toString()} {...testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
};
