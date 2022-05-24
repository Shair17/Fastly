import {FC, PropsWithChildren} from 'react';
import Link from 'next/link';
import {Logo} from '../atoms/Logo';

interface Props {}

// Servicios | Características | Como funciona | Unirse | Blog | Contacto

const headerItems = [
  'Servicios',
  'Características',
  'Como funciona',
  'Unirse',
  'Blog',
  'Contacto',
];

export const Header: FC<PropsWithChildren<Props>> = () => {
  return (
    <header className="sticky top-0 z-50 w-full h-16 backdrop-blur-md bg-white/30">
      <div className="flex items-center h-full px-1 mx-auto max-w-7xl sm:px-3 lg:px-6">
        {/* Logo Container */}
        <div className="flex items-center justify-center flex-1 lg:justify-start">
          <Link href="/" passHref>
            <a className="flex items-center justify-center">
              <Logo className="mr-2 h-7" />
              <span className="self-center text-2xl font-bold">Fastly</span>
            </a>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="items-center justify-center hidden h-full space-x-2 lg:flex">
          {headerItems.map((item, key) => (
            <a
              key={key.toString()}
              className="flex px-1 py-2 font-semibold text-gray-800 transition-colors duration-150 cursor-pointer whitespace-nowrap hover:text-black">
              {item}
            </a>
          ))}
        </nav>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-1 lg:flex-1"></div>
      </div>
    </header>
  );
};
