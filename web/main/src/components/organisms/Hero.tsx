import {AndroidBadge} from 'components/atoms/AndroidBadge';
import {IOSBadge} from 'components/atoms/IOSBadge';
import Link from 'next/link';

export const Hero = () => {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-3 lg:px-6">
        <div className="grid grid-cols-1 items-center justify-center gap-12 md:grid-cols-2">
          <div className="">
            <h1 className="my-5 text-7xl font-extrabold text-gray-900">
              Delivery de lo que quieras en minutos.
            </h1>
            <p className="my-8 max-w-[90%] text-xl text-gray-900">
              Con Fastly puedes pedir lo que quieras cuando quieras en tu
              localidad en unos pocos pasos. Tú tranquilo, nosotros nerviosos.
              Quchau, ya llegamos! Descarga Fastly en tu plataforma de
              preferencia y disfruta de todos los servicios y beneficios que
              tenemos para ti.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/android"
                target="_blank"
                passHref
                title="Descargar Fastly en Android">
                <a className="flex" title="Descargar Fastly en Android">
                  <AndroidBadge />
                </a>
              </Link>
              <Link
                href="/ios"
                target="_blank"
                passHref
                title="Descargar Fastly en iOS">
                <a className="flex" title="Descargar Fastly en iOS">
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
