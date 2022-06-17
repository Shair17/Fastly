import {FC} from 'react';
import Image from 'next/image';
import {TestimonialType} from 'constants/testimonials.constants';
import {
  BrandFacebook,
  BrandTwitter,
  BrandInstagram,
  BrandWhatsapp,
  BrandTiktok,
  World,
} from 'tabler-icons-react';

const SocialIcon: FC<Pick<Props, 'socialType'>> = ({socialType}) => {
  if (socialType === 'facebook') return <BrandFacebook />;
  if (socialType === 'twitter') return <BrandTwitter />;
  if (socialType === 'instagram') return <BrandInstagram />;
  if (socialType === 'whatsapp') return <BrandWhatsapp />;
  if (socialType === 'tiktok') return <BrandTiktok />;

  return <World />;
};

interface Props extends TestimonialType {}

export const Testimonial: FC<Props> = ({
  avatar,
  name,
  quote,
  socialType,
  socialUrl,
  type,
}) => {
  return (
    <div className="px-5 py-6 space-y-5">
      <div className="flex items-center justify-between">
        <Image
          src={avatar}
          width={40}
          height={40}
          alt={name}
          className="rounded-full"
        />
        <div className="min-w-0 ml-3 mr-auto">
          <h3 className="overflow-hidden text-base font-semibold whitespace-nowrap text-ellipsis">
            {name}
          </h3>
          <p className="overflow-hidden text-sm italic text-gray-500 whitespace-nowrap text-ellipsis">
            {type}
          </p>
        </div>
        <a
          href={socialUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-block text-primary-500"
          title="Fuente del testimonio">
          <SocialIcon socialType={socialType} />
        </a>
      </div>
      <blockquote>
        <p className="text-base text-gray-600">{quote}</p>
      </blockquote>
    </div>
  );
};
