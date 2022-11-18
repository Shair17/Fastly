import {FC, PropsWithChildren, useState} from 'react';
import Link from 'next/link';
import {headerItems} from './header-items.constants';
import {Logo} from '../atoms/Logo';
import {ChevronDown} from 'tabler-icons-react';
import styles from 'styles/navbar.module.css';
import useLockBodyScroll from 'react-use/lib/useLockBodyScroll';
import {useMediaQuery} from 'hooks/useMediaQuery';

export const Header: FC<PropsWithChildren> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const matches = useMediaQuery('(min-width: 1024px)');

  useLockBodyScroll(mobileMenuOpen && !matches);

  return (
    <header className="sticky top-0 z-50 h-16 w-full bg-white backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center px-1 sm:px-3 lg:px-6">
        <button
          className="relative ml-1 flex h-10 w-10 items-center justify-center rounded-xl text-gray-700 transition-colors duration-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:ring-offset-2 disabled:border-primary-200 disabled:bg-primary-400 disabled:text-gray-300 lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span className="sr-only">Abrir menu principal</span>
          <div className="absolute left-1/2 top-1/2 block w-5 -translate-x-1/2 -translate-y-1/2 transform">
            <span
              aria-hidden="true"
              className={`absolute block h-0.5 w-5 transform bg-current transition duration-500 ease-in-out ${
                mobileMenuOpen ? 'rotate-45' : '-translate-y-1.5'
              }`}></span>
            <span
              aria-hidden="true"
              className={`absolute block  h-0.5 w-5 transform   bg-current transition duration-500 ease-in-out ${
                mobileMenuOpen && 'opacity-0'
              }`}></span>
            <span
              aria-hidden="true"
              className={`absolute block  h-0.5 w-5 transform bg-current  transition duration-500 ease-in-out ${
                mobileMenuOpen ? '-rotate-45' : 'translate-y-1.5'
              }`}></span>
          </div>
        </button>

        {/* Logo Container */}
        <div className="flex flex-1 items-center justify-center lg:justify-start">
          <Link href="/" passHref title="Inicio de Fastly">
            <a
              className="flex items-center justify-center rounded-xl px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:ring-offset-2 disabled:border-primary-200 disabled:bg-primary-400 disabled:text-gray-300"
              title="Inicio de Fastly">
              <Logo className="mr-2 h-7" />
              <span className="self-center text-2xl font-bold">Fastly</span>
            </a>
          </Link>
        </div>

        <nav className="hidden h-full items-center justify-center space-x-2 lg:flex">
          {headerItems.map(({title, href, items}, key) =>
            items ? (
              <div
                tabIndex={0}
                className={`relative inline-block cursor-default rounded-xl text-left focus:outline-none focus:ring-2 focus:ring-primary-100 focus:ring-offset-2 disabled:border-primary-200 disabled:bg-primary-400 disabled:text-gray-300 ${styles.nav__listitem}`}
                key={key.toString()}>
                <div className="mx-2 flex w-full items-center">
                  <span
                    aria-label={title}
                    className="group flex whitespace-nowrap px-1 py-2 font-semibold text-gray-700 hover:text-black">
                    {title}
                  </span>
                  <ChevronDown
                    className="h-4 w-4 text-inherit"
                    strokeWidth={1}
                  />
                </div>
                <ul
                  className={`absolute -left-20 top-0 mt-10 flex w-[16rem] flex-col space-y-1 rounded-lg border bg-white p-2 shadow-lg lg:w-[18rem] ${styles.nav__listitemdrop}`}
                  tabIndex={0}>
                  {items.map(({title, description, href}, key) => (
                    <li
                      className="w-full cursor-pointer rounded-md px-4 py-3 hover:bg-gray-50 focus:bg-gray-50"
                      key={key.toString()}>
                      <Link href={href} passHref title={title}>
                        <a
                          className="cursor-pointer outline-none"
                          title={title}>
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
              <Link href={href} passHref key={key.toString()} title={title}>
                <a
                  className="group flex whitespace-nowrap rounded-xl px-1 py-2 font-semibold text-gray-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-primary-100 focus:ring-offset-2 disabled:border-primary-200 disabled:bg-primary-400 disabled:text-gray-300"
                  aria-label={title}
                  title={title}>
                  {title}
                </a>
              </Link>
            ),
          )}
        </nav>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-1 lg:flex-1">
          <Link href="/#download" scroll={false} title="Descargar Fastly">
            <a
              className="shadow-xs inline-flex items-center rounded-xl border border-primary-300 bg-primary-500 px-4 py-2.5 text-sm font-bold uppercase text-white shadow-primary-600/5 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:ring-offset-2 disabled:border-primary-200 disabled:bg-primary-400 disabled:text-gray-300"
              title="Descargar Fastly">
              Descargar
            </a>
          </Link>
        </div>
      </div>
      {mobileMenuOpen && !matches ? (
        <div className="mx-auto w-full space-y-4 rounded-b-lg border-t bg-white px-4 py-6 shadow-lg">
          <div className="space-y-4">
            <div>
              <ul>
                <Link
                  href="/#features"
                  passHref
                  title="Características de Fastly">
                  <a className="block w-full cursor-pointer rounded-md border-b border-gray-50 p-2 transition-colors hover:bg-gray-50">
                    Características
                  </a>
                </Link>
                <Link
                  href="/#how-it-works"
                  passHref
                  title="Cómo Funciona Fastly">
                  <a
                    className="block w-full cursor-pointer rounded-md border-b border-gray-50 p-2 transition-colors hover:bg-gray-50"
                    title="Cómo Funciona Fastly">
                    Cómo Funciona
                  </a>
                </Link>
                {/* <Link href="/blog" passHref title="Blog de Fastly">
                  <a
                    className="block w-full cursor-pointer rounded-md border-b border-gray-50 p-2 transition-colors hover:bg-gray-50"
                    title="Blog de Fastly">
                    Blog
                  </a>
                </Link> */}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Servicios</h4>
              <ul>
                <Link href="/" passHref title="Fastly para emprendedores">
                  <a
                    className="block w-full cursor-pointer rounded-md border-b border-gray-50 p-2 transition-colors hover:bg-gray-50"
                    title="Fastly para emprendedores">
                    Emprendedores
                  </a>
                </Link>
                <Link href="/" passHref title="Fastly para repartidores">
                  <a
                    className="block w-full cursor-pointer rounded-md border-b border-gray-50 p-2 transition-colors hover:bg-gray-50"
                    title="Fastly para repartidores">
                    Repartidores
                  </a>
                </Link>
                <Link href="/" passHref title="Fastly para influencers">
                  <a
                    className="block w-full cursor-pointer rounded-md border-b border-gray-50 p-2 transition-colors hover:bg-gray-50"
                    title="Fastly para influencers">
                    Influencers
                  </a>
                </Link>
                <Link href="/" passHref title="Fastly para desarrolladores">
                  <a
                    className="block w-full cursor-pointer rounded-md border-b border-gray-50 p-2 transition-colors hover:bg-gray-50"
                    title="Fastly para desarrolladores">
                    Desarrolladores
                  </a>
                </Link>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Contacto</h4>
              <ul>
                <Link href="/" passHref title="Contacto con Fastly">
                  <a
                    className="block w-full cursor-pointer rounded-md border-b border-gray-50 p-2 transition-colors hover:bg-gray-50"
                    title="Contacto con Fastly">
                    Fastly
                  </a>
                </Link>
                <Link href="/" passHref title="Contacto con Shair">
                  <a
                    className="block w-full cursor-pointer rounded-md border-b border-gray-50 p-2 transition-colors hover:bg-gray-50"
                    title="Contacto con Shair">
                    Shair
                  </a>
                </Link>
              </ul>
            </div>
          </div>
          <Link href="/#download" scroll={false} title="Descargar Fastly">
            <a
              className="shadow-xs inline-flex w-full items-center justify-center rounded-xl border border-primary-300 bg-primary-500 px-4 py-2.5 text-sm font-bold uppercase text-white shadow-primary-600/5 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:ring-offset-2 disabled:border-primary-200 disabled:bg-primary-400 disabled:text-gray-300"
              title="Descargar Fastly">
              Descargar
            </a>
          </Link>
        </div>
      ) : null}
    </header>
  );
};
