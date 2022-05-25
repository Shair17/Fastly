import {FC, PropsWithChildren} from 'react';

interface Props {}

export const Main: FC<PropsWithChildren<Props>> = ({children}) => {
  return (
    <div className="lg:flex">
      <div className="flex-auto w-full min-w-0 lg:static lg:max-h-full lg:overflow-visible">
        {children}
      </div>
    </div>
  );
};
