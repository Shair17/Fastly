import {FC, PropsWithChildren} from 'react';

export const Main: FC<PropsWithChildren> = ({children}) => {
  return (
    <div className="lg:flex">
      <div className="w-full flex-auto lg:static lg:max-h-full lg:overflow-visible">
        {children}
      </div>
    </div>
  );
};
