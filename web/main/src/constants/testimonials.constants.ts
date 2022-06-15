export type TestimonialType = {
  avatar: string;
  name: string;
  type: 'usuario' | 'cliente' | 'repartidor' | 'desarrollador';
  quote: string;
  socialType: 'facebook' | 'twitter' | 'instagram' | 'whatsapp' | 'tiktok';
  socialUrl: string;
};

export const testimonials: TestimonialType[] = [
  {
    avatar: '/assets/images/team/shair.jpg',
    name: 'Jimmy Morales',
    type: 'usuario',
    quote: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    socialType: 'facebook',
    socialUrl: 'https://facebook.com/',
  },
  {
    avatar: '/assets/images/team/shair.jpg',
    name: 'Iván Aguilar',
    type: 'cliente',
    quote: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    socialType: 'tiktok',
    socialUrl: 'https://tiktok.com/',
  },
  {
    avatar: '/assets/images/team/shair.jpg',
    name: 'Jorge Malca',
    type: 'cliente',
    quote: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    socialType: 'instagram',
    socialUrl: 'https://instagram.com/',
  },
  {
    avatar: '/assets/images/team/shair.jpg',
    name: 'Juan Briones',
    type: 'repartidor',
    quote: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    socialType: 'tiktok',
    socialUrl: 'https://tiktok.com/',
  },
  {
    avatar: '/assets/images/team/shair.jpg',
    name: 'William Oliva',
    type: 'usuario',
    quote: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    socialType: 'facebook',
    socialUrl: 'https://facebook.com/',
  },
  {
    avatar: '/assets/images/team/shair.jpg',
    name: 'Hugo Román',
    type: 'usuario',
    quote: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    socialType: 'whatsapp',
    socialUrl: 'https://whatsapp.com/',
  },
  {
    avatar: '/assets/images/team/shair.jpg',
    name: 'Joaquin Quiroz',
    type: 'desarrollador',
    quote: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    socialType: 'facebook',
    socialUrl: 'https://shair.dev/',
  },
];
