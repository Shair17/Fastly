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
      <div className="relative z-0 flex h-full w-full flex-col pt-0 xl:flex-row xl:py-10">
        <div className="order-last mt-0 min-w-0 flex-auto xl:order-first xl:mt-0">
          <div className="relative z-10 my-20 flex flex-col items-center justify-center px-2 sm:px-4 md:px-0 lg:my-32">
            <h1 className="text-center text-3xl font-bold 2xl:text-6xl">
              {props.title}
            </h1>
            <p className="my-6 text-center text-lg md:text-xl">
              {props.description}
            </p>
            <Link href="/" passHref>
              <a className="shadow-xs inline-flex items-center rounded-lg border border-gray-300 bg-white px-5 py-3 text-base font-medium text-gray-700 shadow-primary-600/5 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 focus:ring-offset-2 disabled:border-gray-200 disabled:bg-white disabled:text-gray-300">
                {props.buttonText}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};
