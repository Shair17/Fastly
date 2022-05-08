import {FC, PropsWithChildren} from 'react';
import Link from 'next/link';
import {Logo} from '../atoms/Logo';

interface Props {}

export const Header: FC<PropsWithChildren<Props>> = () => {
  return (
    <header className="sticky top-0 z-50 w-full h-16 backdrop-blur-md bg-white/30">
      <div className="flex items-center justify-center flex-1 lg:justify-start">
        <Link href="/" passHref>
          <a className="flex text-3xl font-bold">
            <Logo className="h-6 mr-1 md:h-7" />
            Fastly
          </a>
        </Link>
      </div>
    </header>
  );
};
