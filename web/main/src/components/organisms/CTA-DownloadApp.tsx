import Link from 'next/link';
import {FC} from 'react';
import Image from 'next/image';
import {AndroidBadge} from '../atoms/AndroidBadge';
import {IOSBadge} from '../atoms/IOSBadge';
import {CircleBackgroundIcon} from '../atoms/CircleBackgroundIcon';

interface Props {}

export const CTADownloadApp: FC<Props> = ({}) => {
  return (
    <div className="w-full my-28" id="download">
      <div className="px-4 mx-auto">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary-400 via-red-400 to-secondary-400">
          <div className="px-4 py-20 mx-auto max-w-7xl sm:px-3 lg:px-6">
            <div className="grid items-center grid-cols-1 gap-12 md:grid-cols-2">
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
                <div className="flex flex-row items-center mt-8 space-x-4 md:mt-12">
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
                <CircleBackgroundIcon className="absolute right-0 bottom-0 left-1/2 -mb-48 h-[460px] w-[460px] -translate-x-1/2 text-primary-50 lg:-mb-72 sm:w-[600px] sm:h-[600px]" />
                <div className="relative w-full max-w-xs mx-auto -mb-20 pl-9 lg:-mb-24">
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
