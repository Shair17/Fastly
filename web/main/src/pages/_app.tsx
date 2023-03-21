import '../styles/fonts.css';
import '../styles/globals.css';
import {Fragment} from 'react';
import type {AppProps} from 'next/app';
import {DefaultSeo} from 'next-seo';
import {defaultSEO} from 'constants/seo.constants';

function MyApp({Component, pageProps}: AppProps) {
  return (
    <Fragment>
      {/* <DefaultSeo {...defaultSEO} /> */}
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
