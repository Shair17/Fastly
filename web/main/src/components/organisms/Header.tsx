import {FC, PropsWithChildren} from 'react';
import Link from 'next/link';
import {useLockBodyScroll, useToggle} from 'react-use';
import {useMediaQuery} from '../../hooks/useMediaQuery';
import {headerItems} from './header-items.constants';
import {Logo} from '../atoms/Logo';
import {ChevronDown} from 'tabler-icons-react';
import styles from '../../styles/navbar.module.css';

interface Props {}

export const Header: FC<PropsWithChildren<Props>> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useToggle(false);
  const matches = useMediaQuery('(min-width: 1024px)');

  useLockBodyScroll(mobileMenuOpen && !matches);

  return (
    <header className="sticky top-0 z-50 w-full h-16 bg-white backdrop-blur-md">
      <div className="flex items-center h-full px-1 mx-auto max-w-7xl sm:px-3 lg:px-6">
        <button
          className="relative flex items-center justify-center w-10 h-10 ml-1 text-gray-700 transition-colors duration-200 lg:hidden hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-100 rounded-xl disabled:bg-primary-400 disabled:border-primary-200 disabled:text-gray-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span className="sr-only">Abrir menu principal</span>
          <div className="absolute block w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
            <span
              aria-hidden="true"
              className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                mobileMenuOpen ? 'rotate-45' : '-translate-y-1.5'
              }`}></span>
            <span
              aria-hidden="true"
              className={`block absolute  h-0.5 w-5 bg-current   transform transition duration-500 ease-in-out ${
                mobileMenuOpen && 'opacity-0'
              }`}></span>
            <span
              aria-hidden="true"
              className={`block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out ${
                mobileMenuOpen ? '-rotate-45' : 'translate-y-1.5'
              }`}></span>
          </div>
        </button>

        {/* Logo Container */}
        <div className="flex items-center justify-center flex-1 lg:justify-start">
          <Link href="/" passHref>
            <a className="flex items-center justify-center px-2 py-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-100 rounded-xl disabled:bg-primary-400 disabled:border-primary-200 disabled:text-gray-300">
              <Logo className="mr-2 h-7" />
              <span className="self-center text-2xl font-bold">Fastly</span>
            </a>
          </Link>
        </div>

        <nav className="items-center justify-center hidden h-full space-x-2 lg:flex">
          {headerItems.map(({title, href, items}, key) =>
            items ? (
              <div
                tabIndex={0}
                className={`rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-100 disabled:bg-primary-400 disabled:border-primary-200 disabled:text-gray-300 relative inline-block text-left cursor-default ${styles.nav__listitem}`}
                key={key.toString()}>
                <div className="flex items-center w-full mx-2">
                  <span
                    aria-label={title}
                    className="flex px-1 py-2 font-semibold text-gray-700 group whitespace-nowrap hover:text-black">
                    {title}
                  </span>
                  <ChevronDown
                    className="w-4 h-4 text-inherit"
                    strokeWidth={1}
                  />
                </div>
                <ul
                  className={`shadow-lg rounded-lg bg-white border flex flex-col space-y-1 p-2 w-[16rem] lg:w-[18rem] -left-20 top-0 absolute mt-10 ${styles.nav__listitemdrop}`}
                  tabIndex={0}>
                  {items.map(({title, description, href}, key) => (
                    <li
                      className="w-full px-4 py-3 rounded-md cursor-pointer hover:bg-gray-50 focus:bg-gray-50"
                      key={key.toString()}>
                      <Link href={href} passHref>
                        <a className="outline-none cursor-pointer ">
                          <span className="text-base font-medium text-gray-900">
                            {title}
                          </span>

                          <div className="mt-1 text-sm text-gray-700 ">
                            {description}
                          </div>
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Link href={href} passHref key={key.toString()}>
                <a
                  className="flex px-1 py-2 font-semibold text-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-100 disabled:bg-primary-400 disabled:border-primary-200 disabled:text-gray-300 group whitespace-nowrap hover:text-black"
                  aria-label={title}>
                  {title}
                </a>
              </Link>
            ),
          )}
        </nav>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-1 lg:flex-1">
          <Link href="/#download" scroll={false}>
            <a className="inline-flex items-center px-4 py-2.5 border border-primary-300 text-sm font-bold uppercase rounded-xl shadow-xs shadow-primary-600/5 text-white bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-100 disabled:bg-primary-400 disabled:border-primary-200 disabled:text-gray-300">
              Descargar
            </a>
          </Link>
        </div>
      </div>
      {mobileMenuOpen && !matches ? (
        <div className="w-full px-4 py-6 mx-auto space-y-4 bg-white border-t rounded-b-lg shadow-lg">
          <div className="space-y-4">
            <div>
              <ul>
                <Link href="/" passHref>
                  <a className="block w-full p-2 transition-colors border-b rounded-md cursor-pointer border-gray-50 hover:bg-gray-50">
                    Características
                  </a>
                </Link>
                <Link href="/" passHref>
                  <a className="block w-full p-2 transition-colors border-b rounded-md cursor-pointer border-gray-50 hover:bg-gray-50">
                    Cómo Funciona
                  </a>
                </Link>
                <Link href="/blog" passHref>
                  <a className="block w-full p-2 transition-colors border-b rounded-md cursor-pointer border-gray-50 hover:bg-gray-50">
                    Blog
                  </a>
                </Link>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Servicios</h4>
              <ul>
                <Link href="/blog" passHref>
                  <a className="block w-full p-2 transition-colors border-b rounded-md cursor-pointer border-gray-50 hover:bg-gray-50">
                    Emprendedores
                  </a>
                </Link>
                <Link href="/blog" passHref>
                  <a className="block w-full p-2 transition-colors border-b rounded-md cursor-pointer border-gray-50 hover:bg-gray-50">
                    Repartidores
                  </a>
                </Link>
                <Link href="/blog" passHref>
                  <a className="block w-full p-2 transition-colors border-b rounded-md cursor-pointer border-gray-50 hover:bg-gray-50">
                    Influencers
                  </a>
                </Link>
                <Link href="/blog" passHref>
                  <a className="block w-full p-2 transition-colors border-b rounded-md cursor-pointer border-gray-50 hover:bg-gray-50">
                    Desarrolladores
                  </a>
                </Link>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Contacto</h4>
              <ul>
                <Link href="/blog" passHref>
                  <a className="block w-full p-2 transition-colors border-b rounded-md cursor-pointer border-gray-50 hover:bg-gray-50">
                    Fastly
                  </a>
                </Link>
                <Link href="/blog" passHref>
                  <a className="block w-full p-2 transition-colors border-b rounded-md cursor-pointer border-gray-50 hover:bg-gray-50">
                    Shair
                  </a>
                </Link>
              </ul>
            </div>
          </div>
          <Link href="/#download" scroll={false}>
            <a className="w-full justify-center inline-flex items-center px-4 py-2.5 border border-primary-300 text-sm font-bold uppercase rounded-xl shadow-xs shadow-primary-600/5 text-white bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-100 disabled:bg-primary-400 disabled:border-primary-200 disabled:text-gray-300">
              Descargar
            </a>
          </Link>
        </div>
      ) : null}
    </header>
  );
};
