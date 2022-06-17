import {FC} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {BrandFacebook, BrandWhatsapp, BrandInstagram} from 'tabler-icons-react';

interface Props {
  name: string;
  description: string;
  avatar: string;
  facebook: string;
  instagram: string;
  whatsapp: string;
}

export const TeamMember: FC<Props> = ({
  avatar,
  description,
  facebook,
  instagram,
  name,
  whatsapp,
}) => {
  return (
    <div className="flex flex-col md:items-center md:flex-row md:space-x-6">
      <div className="flex items-end justify-start overflow-hidden rounded-lg">
        <Image src={avatar} width={96} height={96} alt={name} />
      </div>
      <div className="flex flex-col justify-between mt-2 text-left md:py-2 md:mt-0">
        <h3 className="mt-1 text-lg font-medium text-gray-600">{name}</h3>
        <p>{description}</p>
        <div className="mt-2 space-x-1 text-gray-400 md:mt-4">
          <Link href={facebook} passHref title="Fastly Facebook">
            <a
              className="inline-flex items-center justify-center"
              title="Fastly Facebook">
              <BrandFacebook />
            </a>
          </Link>
          <Link href={instagram} passHref title="Fastly Instagram">
            <a
              className="inline-flex items-center justify-center"
              title="Fastly Instagram">
              <BrandInstagram />
            </a>
          </Link>
          <Link href={whatsapp} passHref title="Fastly WhatsApp">
            <a
              className="inline-flex items-center justify-center"
              title="Fastly WhatsApp">
              <BrandWhatsapp />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
