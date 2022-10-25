import {FC, PropsWithChildren} from 'react';
import {Layout} from './Layout';

interface Props {
  title: string;
  lastUpdate: string;
}

export const LegalLayout: FC<PropsWithChildren<Props>> = ({
  title,
  lastUpdate,
  children,
}) => {
  return (
    <Layout title={title}>
      <div className="relative">
        <div className="mx-auto my-16 flex w-full max-w-7xl flex-col items-center px-4 sm:px-3 lg:my-24 lg:px-6">
          <h1 className="text-center text-3xl font-bold 2xl:text-6xl">
            {title}
          </h1>
          <p className="my-6 text-center text-sm">
            <span className="text-gray-700">Última actualización:</span>{' '}
            {lastUpdate}
          </p>
          <div className="mx-auto w-full space-y-8">{children}</div>
        </div>
      </div>
    </Layout>
  );
};
