import {FC, PropsWithChildren} from 'react';
import Link from 'next/link';
import {headerItems} from './header-items.constants';
import {Logo} from '../atoms/Logo';
import {ChevronDown} from 'tabler-icons-react';
import styles from '../../styles/navbar.module.css';

interface Props {}

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

        <nav className="items-center justify-center hidden h-full space-x-2 lg:flex">
          {headerItems.map(({title, href, items}, key) =>
            items ? (
              <div
                tabIndex={0}
                className={`relative inline-block text-left cursor-default ${styles.nav__listitem}`}
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
                  className={`shadow-lg rounded-lg bg-white flex flex-col space-y-1 p-2 w-[16rem] lg:w-[18rem] -left-20 top-0 absolute mt-10 ${styles.nav__listitemdrop}`}
                  tabIndex={0}>
                  {items.map(({title, description, href}, key) => (
                    <li
                      className="w-full px-4 py-3 rounded-md cursor-pointer hover:bg-gray-50 focus:bg-gray-50"
                      key={key.toString()}>
                      <Link href={href} passHref>
                        <a className="outline-none cursor-pointer">
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
                  className="flex px-1 py-2 font-semibold text-gray-700 group whitespace-nowrap hover:text-black"
                  aria-label={title}>
                  {title}
                </a>
              </Link>
            ),
          )}
        </nav>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-1 lg:flex-1">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2.5 border border-primary-300 text-sm font-bold uppercase rounded-xl shadow-xs shadow-primary-600/5 text-white bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-100 disabled:bg-primary-400 disabled:border-primary-200 disabled:text-gray-300">
            Descargar
          </button>
        </div>
      </div>
    </header>
  );
};
