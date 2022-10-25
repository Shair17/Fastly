import {FacebookIcon} from '../atoms/FacebookIcon';
import {InstagramIcon} from '../atoms/InstagramIcon';
import {WhatsappIcon} from '../atoms/WhatsappIcon';

export const footerSocial = [
  {
    title: 'Facebook de Fastly',
    href: '/app-facebook',
    icon: (
      <FacebookIcon className="h-6 w-6 text-primary-100 hover:text-white" />
    ),
  },
  {
    title: 'Instagram de Fastly',
    href: '/app-instagram',
    icon: (
      <InstagramIcon className="h-6 w-6 text-primary-100 hover:text-white" />
    ),
  },
  {
    title: 'Whatsapp de Fastly',
    href: '/app-whatsapp',
    icon: (
      <WhatsappIcon className="h-6 w-6 text-primary-100 hover:text-white" />
    ),
  },
];
