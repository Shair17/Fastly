import {faq} from 'constants/faq.constants';

export const FAQ = () => {
  return (
    <div className="my-28 w-full">
      <div className="mx-auto max-w-5xl px-1 sm:px-3 lg:px-6">
        <h2 className="text-center text-4xl font-bold">
          Preguntas Más Frecuentes
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-gray-700">
          Estas son algunas de las preguntas más frecuentes que puedes
          encontrar, si tienes alguna que no está aquí, puedes escribirnos a{' '}
          <a href="mailto:soporte@fastly.delivery" className="text-primary-500">
            soporte@fastly.delivery
          </a>
          .
        </p>
        <div className="my-16 grid grid-cols-1 gap-12 md:grid-cols-2">
          {faq.map(({question, reply}, key) => (
            <div key={key.toString()} className="flex space-x-4">
              <div className="mt-1">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 p-1 text-xs font-bold text-white">
                  i
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl font-bold">{question}</h3>
                <p className="text-base text-gray-600">{reply}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
