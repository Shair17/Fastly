import {FC, PropsWithChildren} from 'react';
import Link from 'next/link';
import {Logo} from '../atoms/Logo';
import {AndroidBadge} from '../atoms/AndroidBadge';
import {IOSBadge} from '../atoms/IOSBadge';
import {footerItems} from './footer-items.constants';
import {footerSocial} from './footer-social.constants';

export const Footer: FC<PropsWithChildren> = () => {
  return (
    <footer className="relative z-10">
      <div className="bg-primary-500">
        <div className="mx-auto grid max-w-7xl gap-16 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:py-16 lg:px-8">
          <div>
            <section>
              <div>
                <Link href="/" passHref title="Inicio de Fastly">
                  <a
                    className="inline-flex rounded-full bg-white px-4 py-2"
                    title="Inicio de Fastly">
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
                <div className="mt-2 space-y-2">
                  <Link
                    href="/android"
                    target="_blank"
                    passHref
                    title="Descargar Fastly en Android">
                    <a className="block" title="Descargar Fastly en Android">
                      <AndroidBadge />
                    </a>
                  </Link>
                  <Link
                    href="/ios"
                    target="_blank"
                    passHref
                    title="Descargar Fastly en iOS">
                    <a className="block" title="Descargar Fastly en iOS">
                      <IOSBadge />
                    </a>
                  </Link>
                </div>
              </div>
            </section>
            <ul className="mt-4 flex items-center space-x-4 xl:space-x-5">
              {footerSocial.map(({title, href, icon}, key) => (
                <li key={key.toString()}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
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
                    <Link href={href} passHref title={name}>
                      <a
                        className="text-primary-100 hover:text-white"
                        title={name}>
                        {name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
          <div className="text-white">
            © {new Date().getFullYear().toString()} <strong>Fastly</strong> ·
            Desarrollado por{' '}
            <strong>
              <Link
                href="/shair-instagram"
                passHref
                target="_blank"
                rel="noreferrer">
                <a className="hover:underline">@shair.dev</a>
              </Link>
            </strong>{' '}
            · Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};
