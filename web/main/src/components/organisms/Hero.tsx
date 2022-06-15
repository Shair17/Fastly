import {AndroidBadge} from 'components/atoms/AndroidBadge';
import {IOSBadge} from 'components/atoms/IOSBadge';
import Link from 'next/link';

export const Hero = () => {
  return (
    <div className="w-full">
      <div className="px-4 py-16 mx-auto max-w-7xl sm:px-3 lg:px-6">
        <div className="grid items-center justify-center grid-cols-1 gap-12 md:grid-cols-2">
          <div className="">
            <h1 className="my-5 font-extrabold text-gray-900 text-7xl">
              Delivery de lo que quieras en minutos.
            </h1>
            <p className="max-w-[90%] my-8 text-xl text-gray-900">
              Con Fastly puedes pedir lo que quieras cuando quieras en tu
              localidad en unos pocos pasos. Tú tranquilo, nosotros nerviosos.
              Quchau, ya llegamos! Descarga Fastly en tu plataforma de
              preferencia y disfruta de todos los servicios y beneficios que
              tenemos para ti.
            </p>
            <div className="flex space-x-4">
              <Link href="/android" target="_blank" passHref>
                <a className="flex">
                  <AndroidBadge />
                </a>
              </Link>
              <Link href="/ios" target="_blank" passHref>
                <a className="flex">
                  <IOSBadge />
                </a>
              </Link>
            </div>
          </div>
          <div className="">mockup</div>
        </div>
      </div>
    </div>
  );
};
