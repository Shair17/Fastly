import {AndroidBadge} from 'components/atoms/AndroidBadge';
import {CircleBackgroundIcon} from 'components/atoms/CircleBackgroundIcon';
import {IOSBadge} from 'components/atoms/IOSBadge';
import Image from 'next/image';
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
          <div className="relative">
            <CircleBackgroundIcon className="absolute right-0 bottom-0 left-1/2 -mb-48 hidden h-[460px] w-[460px] -translate-x-1/2 text-primary-50 sm:h-[600px] sm:w-[600px] lg:-mb-72 xl:flex" />
            <div className="relative mx-auto -mb-20 w-full max-w-xs lg:-mb-24">
              <Image
                src="/assets/images/mockup.png"
                width={500}
                height={1000}
                alt="Fastyl mockup"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
