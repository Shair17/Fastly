import Link from 'next/link';
import {FC} from 'react';
import Image from 'next/image';
import {AndroidBadge} from '../atoms/AndroidBadge';
import {IOSBadge} from '../atoms/IOSBadge';
import {CircleBackgroundIcon} from '../atoms/CircleBackgroundIcon';

export const CTADownloadApp: FC = () => {
  return (
    <div className="my-28 w-full" id="download">
      <div className="mx-auto px-4">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary-400 via-red-400 to-secondary-400">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-3 lg:px-6">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <div>
                <h2 className="text-5xl font-bold text-white md:text-6xl">
                  Descargar Fastly
                </h2>
                <p className="mt-4 text-base text-gray-200 md:text-xl">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Rerum vel nesciunt voluptatem ut iure iusto obcaecati soluta
                  unde doloremque incidunt illum amet, iste fuga adipisci vero
                  cupiditate veritatis at nemo!
                </p>
                <div className="mt-8 flex flex-row items-center space-x-4 md:mt-12">
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
              <div className="relative px-12">
                <CircleBackgroundIcon className="absolute right-0 bottom-0 left-1/2 -mb-48 h-[460px] w-[460px] -translate-x-1/2 text-primary-50 sm:h-[600px] sm:w-[600px] lg:-mb-72" />
                <div className="relative mx-auto -mb-20 w-full max-w-xs pl-9 lg:-mb-24">
                  <Image
                    src="/assets/images/iphone-mockup.png"
                    width={250}
                    height={500}
                    alt="Fastyl mockup"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
