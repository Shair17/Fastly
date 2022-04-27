export type Slide = {
  id: number;
  image: any;
  title: string;
  subtitle: string;
};

export const slides: Slide[] = [
  {
    id: 1,
    image: require('../../assets/images/onboarding/find.png'),
    title: 'Encuentra Lo Que Te Gusta',
    subtitle:
      'Selecciona entre todos los productos y servicios que tenemos para ti.',
  },
  {
    id: 2,
    image: require('../../assets/images/onboarding/deliver.png'),
    title: 'A Donde Quieras',
    subtitle: 'Ordena y recibe tus pedidos en cuestión de minutos.',
  },
  {
    id: 3,
    image: require('../../assets/images/onboarding/enjoy.png'),
    title: 'Disfruta y Diviertete',
    subtitle: 'Disfruta de tu riquísima pizza con tu gaseosa heladita. 🤤',
  },
];
