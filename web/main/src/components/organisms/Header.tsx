import {FC, PropsWithChildren} from 'react';
import Link from 'next/link';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import clsx from 'clsx';
import {Logo} from '../atoms/Logo';

interface Props {}

const headerItems = [
  {
    title: 'Características',
  },
  {
    title: 'Como Funciona',
  },
  {
    title: 'Servicios',
    items: [
      {
        title: 'Fastly para Emprendedores',
        description:
          'Incrementa tus ventas y llega a más personas y potenciales clientes con nuestro sistema de emprendedores.',
      },
      {
        title: 'Fastly para Repartidores',
        description:
          'Genera dinero extra realizando pedidos y recibes el 100% de tus propinas con nuestro sistema amigable para el repartidor.',
      },
      {
        title: 'Fastly para Influencers',
        description:
          'Si tienes una comunidad entonces Fastly para Influencers es para ti! Ayúdanos a llegar a más personas y nosotros te daremos muchos beneficios.',
      },
      {
        title: 'Fastly para Desarrolladores',
        description:
          '¿Eres curioso eh? Si tienes los conocimientos necesarios entonces Fastly para Desarrolladores es para ti, usamos mejores tecnologías y practicas que en otras plataformas.',
      },
    ],
  },
  {
    title: 'Blog',
  },
  {
    title: 'Contacto',
    items: [
      {
        title: 'Fastly',
        description: 'Ponte en contacto con Fastly',
      },
      {
        title: 'Shair',
        description: 'Ponte en contacto con Shair',
      },
    ],
  },
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
          {headerItems.map(({title}, key) => (
            <a
              key={key.toString()}
              className="flex px-1 py-2 font-semibold text-gray-800 transition-colors duration-150 cursor-pointer whitespace-nowrap hover:text-black">
              {title}
            </a>
          ))}
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
