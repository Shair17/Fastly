import type {NextPage} from 'next';
import {Layout} from 'components/templates/Layout';
import {PhoneCall, Mail, Location} from 'tabler-icons-react';

// https://landingfolio.com/store/components/contact?id=616d00fafe9824b06e924375

const Contacto: NextPage = () => {
  return (
    <Layout title="Contacto">
      <div className="w-full my-20" id="contacto">
        <div className="max-w-6xl px-1 mx-auto sm:px-3 lg:px-6">
          <h1 className="text-4xl font-bold text-center">Contacto</h1>
          <p className="max-w-2xl mx-auto mt-6 text-lg text-center text-gray-700">
            Mediante este formulario puedes ponerte en contacto con{' '}
            <span className="text-primary-500">Fastly</span>, llena todos los
            campos con datos válidos y serios por favor.
          </p>
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <div className="overflow-hidden">
                <div className="flex flex-col items-center justify-center p-6 space-y-4">
                  <PhoneCall className="w-10 h-10 mx-auto text-gray-500 shrink-0" />
                  <p className="text-lg font-medium text-gray-600">
                    +51 966107266
                  </p>
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="flex flex-col items-center justify-center p-6 space-y-4">
                  <Mail className="w-10 h-10 mx-auto text-gray-500 shrink-0" />
                  <p className="text-lg font-medium text-gray-600">
                    soporte@fastly.delivery
                  </p>
                  <p className="text-lg font-medium text-gray-600">
                    hello@shair.dev
                  </p>
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="flex flex-col items-center justify-center p-6 space-y-4">
                  <Location className="w-10 h-10 mx-auto text-gray-500 shrink-0" />
                  <p className="text-lg font-medium text-gray-600">
                    Ricardo Palma 200 Chequen
                  </p>
                </div>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="px-6 py-12 sm:p-12">
                <h2 className="text-3xl font-bold text-center text-gray-900">
                  Mandanos un mensaje
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contacto;
