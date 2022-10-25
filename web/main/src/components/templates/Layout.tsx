import {Fragment, FC, PropsWithChildren} from 'react';
import {NextSeo} from 'next-seo';
import {Header} from '../organisms/Header';
import {Main} from '../organisms/Main';
import {Footer} from '../organisms/Footer';

interface Props {
  title: string;
}

export const Layout: FC<PropsWithChildren<Props>> = ({children, title}) => {
  return (
    <Fragment>
      <NextSeo title={title} />
      <div className="relative flex min-h-screen w-full flex-col">
        <Header />
        <Main>{children}</Main>
        <Footer />
      </div>
    </Fragment>
  );
};
