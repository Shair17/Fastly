import {FC, PropsWithChildren} from 'react';
import Link from 'next/link';
import {Logo} from '../atoms/Logo';
import {AndroidBadge} from '../atoms/AndroidBadge';
import {IOSBadge} from '../atoms/IOSBadge';
import {FacebookIcon} from '../atoms/FacebookIcon';
import {InstagramIcon} from '../atoms/InstagramIcon';
import {WhatsappIcon} from '../atoms/WhatsappIcon';

const footerSocial = [
  {
    title: '',
    href: '',
    icon: (
      <FacebookIcon className="w-6 h-6 text-primary-100 hover:text-white" />
    ),
  },
  {
    title: '',
    href: '',
    icon: (
      <InstagramIcon className="w-6 h-6 text-primary-100 hover:text-white" />
    ),
  },
  {
    title: '',
    href: '',
    icon: (
      <WhatsappIcon className="w-6 h-6 text-primary-100 hover:text-white" />
    ),
  },
];

const footerItems = [
  {
    title: 'Ecosistema',
    items: [
      {
        name: 'Emprendedores',
        href: '#',
      },
      {
        name: 'Repartidores',
        href: '#',
      },
      {
        name: 'Desarrolladores',
        href: '#',
      },
      {
        name: 'Influencers',
        href: '#',
      },
      {
        name: 'Inversionistas',
        href: '#',
      },
    ],
  },
  {
    title: 'Recursos',
    items: [
      {
        name: 'Fastly para Android',
        href: '#',
      },
      {
        name: 'Fastly para iOS',
        href: '#',
      },
      {
        name: 'Assets de Fastly',
        href: '#',
      },
      {
        name: 'Panel del Emprendedor',
        href: '#',
      },
      {
        name: 'Panel del Repartidor',
        href: '#',
      },
      {
        name: 'Panel del Administrador',
        href: '#',
      },
    ],
  },
  {
    title: 'Acerca de Fastly',
    items: [
      {
        name: 'Contacto',
        href: '#',
      },
      {
        name: 'Política de Privacidad',
        href: '#',
      },
      {
        name: 'Terminos y Condiciones',
        href: '#',
      },
      {
        name: 'Servicios de Fastly',
        href: '#',
      },
      {
        name: 'Blog de Fastly',
        href: '#',
      },
      {
        name: 'Shair en Fastly',
        href: '#',
      },
    ],
  },
];

interface Props {}

export const Footer: FC<PropsWithChildren<Props>> = () => {
  return (
    <footer className="relative z-10">
      <div className="bg-primary-500">
        <div className="grid gap-16 px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <section>
              <div>
                <Link href="/" passHref>
                  <a className="inline-flex px-4 py-2 bg-white rounded-full">
                    <Logo className="mr-2 h-7" />
                    <span className="self-center text-2xl font-bold">
                      Fastly
                    </span>
                  </a>
                </Link>
                <p className="mt-2 text-base text-white">
                  Estás a un clic de disfrutar todos los servicios, ofertas y
                  beneficios que tenemos para ti. ¡Ahora disponible en ambas
                  plataformas!
                </p>
              </div>
              <div>
                <div className="mt-2 space-y-1">
                  <a href="#" className="block">
                    <AndroidBadge />
                  </a>
                  <a href="#" className="block">
                    <IOSBadge />
                  </a>
                </div>
              </div>
            </section>
            <ul className="flex items-center mt-4 space-x-4 xl:space-x-5">
              {footerSocial.map(({title, href, icon}, key) => (
                <li key={key.toString()}>
                  <a
                    href={href}
                    target="_blank"
                    aria-label={title}
                    title={title}
                    className="block">
                    {icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {footerItems.map(({title, items}, key) => (
            <div key={key.toString()}>
              <h3 className="text-lg font-bold text-gray-50">{title}</h3>
              <ul className="mt-4 space-y-3">
                {items.map(({name, href}, key) => (
                  <li key={key.toString()}>
                    <a
                      className="text-primary-100 hover:text-white"
                      href={href}>
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="px-4 pb-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-white">
            © {new Date().getFullYear().toString()} <strong>Fastly</strong> ·
            Desarrollado por{' '}
            <strong>
              <a
                href="https://www.instagram.com/shair.dev"
                target="_blank"
                className="hover:underline">
                @shair.dev
              </a>
            </strong>{' '}
            · Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};
