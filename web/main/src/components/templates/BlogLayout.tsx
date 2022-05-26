import {FC, PropsWithChildren} from 'react';
import {Layout} from './Layout';

interface Props {}

export const BlogLayout: FC<PropsWithChildren<Props>> = ({children}) => {
  return (
    <Layout>
      <div className="relative">
        <div className="flex flex-col items-center w-full mx-auto my-16 lg:my-24 max-w-7xl sm:px-3 lg:px-6">
          {children}
        </div>
      </div>
    </Layout>
  );
};
