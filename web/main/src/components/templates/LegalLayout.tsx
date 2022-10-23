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
        <div className="flex flex-col items-center w-full px-4 mx-auto my-16 lg:my-24 max-w-7xl sm:px-3 lg:px-6">
          <h1 className="text-3xl font-bold text-center 2xl:text-6xl">
            {title}
          </h1>
          <p className="my-6 text-sm text-center">
            <span className="text-gray-700">Última actualización:</span>{' '}
            {lastUpdate}
          </p>
          <div className="w-full mx-auto space-y-8">{children}</div>
        </div>
      </div>
    </Layout>
  );
};
