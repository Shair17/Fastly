import type {NextPage} from 'next';
import {} from 'next';
// import {Layout} from 'components/templates/Layout';
// import {Hero} from 'components/organisms/Hero';
// import {Features} from 'components/organisms/Features';
// import {HowItWorks} from 'components/organisms/HowItWorks';
// import {Team} from 'components/organisms/Team';
// import {Testimonials} from 'components/organisms/Testimonials';
// import {CTADownloadApp} from 'components/organisms/CTA-DownloadApp';
//import {FAQ} from 'components/organisms/FAQ';

const Home: NextPage = () => {
  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
      <div className="absolute inset-0 bg-[url(/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
        <div className="mx-auto max-w-md">
          <h1 className="text-3xl font-bold">fastly.delivery</h1>
          <div className="divide-y divide-gray-300/50">
            <div className="space-y-3 py-4 text-base leading-7 text-gray-600">
              <p>Domain for sale!</p>
              <p>The price is negotiable and starts at just $99 dollars!</p>

              <ul className="space-y-4">
                <li className="flex items-center">
                  <svg
                    className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    <circle cx="12" cy="12" r="11" />
                    <path
                      d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                      fill="none"
                    />
                  </svg>
                  <p className="ml-4">Perfect domain name</p>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    <circle cx="12" cy="12" r="11" />
                    <path
                      d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                      fill="none"
                    />
                  </svg>
                  <p className="ml-4">Negotiable</p>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    <circle cx="12" cy="12" r="11" />
                    <path
                      d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                      fill="none"
                    />
                  </svg>
                  <p className="ml-4">100% secure</p>
                </li>
              </ul>
              <p>
                <strong>fastly.delivery</strong> is a distinctive and memorable
                domain name that can help boost your online presence and
                increase traffic to your website.
              </p>
              <p>
                This domain is perfect for any delivery company, whether you
                deliver food, packages, beauty products, or any other products.
              </p>

              <p>
                Don't miss this unique opportunity to secure an exclusive and
                memorable domain name.
              </p>
            </div>
            <div className="flex flex-col pt-8 text-base font-semibold leading-7 md:flex-row">
              <p className="text-gray-900">Are you interested in?</p>
              <p>
                <a
                  href="mailto:hello@shair.dev?subject=I want to buy fastly.delivery domain"
                  className="text-sky-500 hover:text-sky-600 md:ml-2">
                  Contact us
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
