export interface LogInWithFacebookType {
  accessToken: string;
  userID: string;
}

export type PersonalInformationType = {
  email: string;
  phone: string;
  dni: string;
};

export type LocationInformationType = {
  name: string;
  street: string;
  instructions: string;
  zip: string;
  city: string;
  // latitude: number;
  // longitude: number;
};

export enum StoreCategory {
  LICORERIA = 'Licorería',
  RESTAURANTE = 'Restaurante',
  MASCOTAS = 'Mascotas',
  MODA = 'Moda',
  TECNOLOGIA = 'Tecnología',
  JUGUETERIA = 'Juguetería',
  FARMACIA = 'Farmacia',
  CUIDADO_PERSONAL = 'Cuidado Personal',
  MAQUILLAJE = 'Maquillaje',
  FLORISTERIA = 'Floristería',
  TIENDA = 'Tienda',
  SUPERMERCADOS = 'Supermercados',
  LIBRERIA = 'Librería',
  JUGUERIA = 'Juguería',
  OTRO = 'Otro',
}
