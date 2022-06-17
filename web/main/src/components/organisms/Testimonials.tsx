import {FC} from 'react';
import {Testimonial} from '../molecules/Testimonial';
import {testimonials} from 'constants/testimonials.constants';

interface Props {}

export const Testimonials: FC<Props> = () => {
  return (
    <div className="w-full my-28" id="testimonials">
      <div className="px-1 mx-auto max-w-7xl sm:px-3 lg:px-6">
        <h2 className="text-4xl font-bold text-center">Testimonios</h2>
        <p className="max-w-2xl mx-auto mt-6 text-lg text-center text-gray-700">
          Estos son algunos testimonios de las personan sobre{' '}
          <span className="text-primary-500">Fastly</span>.
        </p>
        <div className="grid grid-cols-1 gap-20 my-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {testimonials.map((testimonial, key) => (
            <Testimonial key={key.toString()} {...testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
};
