import Link from 'next/link';
import {Layout} from './Layout';

interface Props {
  title: string;
  description: string;
  buttonText: string;
}

export const Error = (props: Props) => {
  return (
    <Layout title={props.title}>
      <div className="relative z-0 flex flex-col w-full h-full pt-0 xl:flex-row xl:py-10">
        <div className="flex-auto order-last min-w-0 mt-0 xl:order-first xl:mt-0">
          <div className="relative z-10 flex flex-col items-center justify-center px-2 my-20 sm:px-4 lg:my-32 md:px-0">
            <h1 className="text-3xl font-bold text-center 2xl:text-6xl">
              {props.title}
            </h1>
            <p className="my-6 text-lg text-center md:text-xl">
              {props.description}
            </p>
            <Link href="/" passHref>
              <a className="inline-flex items-center px-5 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-xs shadow-primary-600/5 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-gray-100 disabled:bg-white disabled:border-gray-200 disabled:text-gray-300">
                {props.buttonText}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};
