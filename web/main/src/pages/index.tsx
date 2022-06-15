import type {NextPage} from 'next';
import {Layout} from 'components/templates/Layout';
import {Hero} from 'components/organisms/Hero';
import {Features} from 'components/organisms/Features';
import {HowItWorks} from 'components/organisms/HowItWorks';
import {Team} from 'components/organisms/Team';
import {Testimonials} from 'components/organisms/Testimonials';
import {CTADownloadApp} from 'components/organisms/CTA-DownloadApp';
import {FAQ} from 'components/organisms/FAQ';

const Home: NextPage = () => {
  return (
    <Layout title="Delivery de lo que quieras en minutos">
      <Hero />
      <Features />
      <HowItWorks />
      <Team />
      <Testimonials />
      <CTADownloadApp />
      <FAQ />
    </Layout>
  );
};

export default Home;
