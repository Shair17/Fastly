import type {NextPage} from 'next';
import {Layout} from 'components/templates/Layout';
import {Team} from 'components/organisms/Team';

const Home: NextPage = () => {
  return (
    <Layout>
      index
      <Team />
    </Layout>
  );
};

export default Home;
