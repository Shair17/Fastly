import {FC, PropsWithChildren} from 'react';
import {Layout} from './Layout';

export const BlogLayout: FC<PropsWithChildren> = ({children}) => {
  return (
    <Layout title="Blog">
      <div className="relative">
        <div className="mx-auto my-12 flex w-full max-w-7xl flex-col items-center sm:px-3 lg:my-16 lg:px-6">
          {children}
        </div>
      </div>
    </Layout>
  );
};
