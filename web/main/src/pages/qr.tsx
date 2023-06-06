import type {NextPage} from 'next';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {Layout} from 'components/templates/Layout';
import {CTADownloadApp} from 'components/organisms/CTA-DownloadApp';
import {useOs} from 'hooks/useOs';

const QrPage: NextPage = () => {
  const os = useOs();
  const router = useRouter();

  useEffect(() => {
    const isAndroid = os === 'android';
    const isIOS = os === 'ios';

    if (isAndroid) {
      router.push('/android');
    } else if (isIOS) {
      router.push('/ios');
    }
  }, [os, router]);

  return (
    <Layout title="Descarga Fastly Delivery!">
      <div className="grid min-h-screen place-content-center">
        <CTADownloadApp />
      </div>
    </Layout>
  );
};

export default QrPage;
