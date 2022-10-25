import {DefaultSeoProps} from 'next-seo';

const description =
  'Con Fastly puedes pedir lo que quieras cuando quieras en tu localidad en unos pocos pasos. Tú tranquilo, nosotros nerviosos. Quchau, ya llegamos! Descarga Fastly en tu plataforma de preferencia y disfruta de todos los servicios y beneficios que tenemos para ti.';

export const defaultSEO: DefaultSeoProps = {
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
    // {
    //   rel: "preload",
    //   href: "/assets/fonts/Inter-italic-latin.var.woff2",
    //   as: "font",
    //   type: "font/woff2",
    //   crossOrigin: "anonymous",
    // },
    // {
    //   rel: "preload",
    //   href: "/assets/fonts/Inter-roman-latin.var.woff2",
    //   as: "font",
    //   type: "font/woff2",
    //   crossOrigin: "anonymous",
    // },
  ],
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://fastly.delivery/',
    site_name: 'Fastly Delivery Perú',
    title: 'Delivery de lo que quieras en minutos | Fastly Delivery Perú',
    description,
  },
  twitter: {
    handle: '@shair_dev',
    site: '@shair_dev',
    cardType: 'summary_large_image',
  },
  facebook: {
    appId: '426666722516954',
  },
  titleTemplate: '%s | Fastly Delivery Perú',
  description,
  canonical: 'https://fastly.delivery/',
  defaultTitle: 'Delivery de lo que quieras en minutos | Fastly Delivery Perú',
};
