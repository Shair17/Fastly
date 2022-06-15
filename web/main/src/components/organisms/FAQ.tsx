import {faq} from 'constants/faq.constants';

export const FAQ = () => {
  return (
    <div className="w-full my-28">
      <div className="max-w-5xl px-1 mx-auto sm:px-3 lg:px-6">
        <h3 className="text-4xl font-bold text-center">
          Preguntas Más Frecuentes
        </h3>
        <p className="max-w-2xl mx-auto mt-6 text-lg text-center text-gray-700">
          Estas son algunas de las preguntas más frecuentes que puedes
          encontrar, si tienes alguna que no está aquí, puedes escribirnos a{' '}
          <a href="mailto:hi@shair.dev" className="text-primary-500">
            hi@shair.dev
          </a>
          .
        </p>
        <div className="grid grid-cols-1 gap-12 my-16 md:grid-cols-2">
          {faq.map(({question, reply}, key) => (
            <div key={key.toString()} className="flex space-x-4">
              <div className="mt-1">
                <div className="flex items-center justify-center w-5 h-5 p-1 text-xs font-bold text-white rounded-full bg-primary-500">
                  i
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <h4 className="text-xl font-bold">{question}</h4>
                <p className="text-base text-gray-600">{reply}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
