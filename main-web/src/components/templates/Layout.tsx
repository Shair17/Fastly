import {FC, PropsWithChildren} from 'react';
import {Header} from '../organisms/Header';
import {Footer} from '../organisms/Footer';

interface Props {}

export const Layout: FC<PropsWithChildren<Props>> = ({children}) => {
  return (
    <div className="relative flex flex-col w-full min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
