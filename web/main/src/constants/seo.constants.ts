import {DefaultSeoProps} from 'next-seo';

const description = 'Domain fastly.delivery for sale! | Fastly Delivery';

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
  // openGraph: {
  //   type: 'website',
  //   locale: 'es_PE',
  //   url: 'https://fastly.delivery/',
  //   site_name: 'Fastly Delivery Perú',
  // title: 'Delivery de lo que quieras en minutos | Fastly Delivery Perú',
  //   description,
  // },
  twitter: {
    handle: '@shair_dev',
    site: '@shair_dev',
    cardType: 'summary_large_image',
  },
  // facebook: {
  //   appId: '426666722516954',
  // },
  titleTemplate: '%s | Fastly Delivery',
  description,
  canonical: 'https://fastly.delivery/',
  defaultTitle: 'Domain fastly.delivery for sale! | Fastly Delivery',
};
