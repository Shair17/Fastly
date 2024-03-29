export interface Store {
  id: string;
  name: string;
  description?: string;
  address: string;
  logo: string;
  category: StoreCategory;
  categoryDescription?: string;
  openTime?: string;
  closeTime?: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  blurHash: string;
  couponId: string;
  createdAt: string;
  updatedAt: string;
  storeId: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface LogInWithFacebookType {
  accessToken: string;
  userID: string;
}

export type PersonalInformationType = {
  email: string;
  phone: string;
  dni: string;
};

export type AddAddressResponseType = {
  statusCode: number;
  id: MyProfileResponse['id'];
  addresses: Address[];
  message: string;
  success: boolean;
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

export enum StoreCategoryEnum {
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
export type StoreCategory =
  | 'LICORERIA'
  | 'RESTAURANTE'
  | 'MASCOTAS'
  | 'MODA'
  | 'TECNOLOGIA'
  | 'JUGUETERIA'
  | 'FARMACIA'
  | 'CUIDADO_PERSONAL'
  | 'MAQUILLAJE'
  | 'FLORISTERIA'
  | 'TIENDA'
  | 'SUPERMERCADOS'
  | 'LIBRERIA'
  | 'JUGUERIA'
  | 'OTRO';
// export const StoreCategory: {
//   LICORERIA: 'LICORERIA',
//   RESTAURANTE: 'RESTAURANTE',
//   MASCOTAS: 'MASCOTAS',
//   MODA: 'MODA',
//   TECNOLOGIA: 'TECNOLOGIA',
//   JUGUETERIA: 'JUGUETERIA',
//   FARMACIA: 'FARMACIA',
//   CUIDADO_PERSONAL: 'CUIDADO_PERSONAL',
//   MAQUILLAJE: 'MAQUILLAJE',
//   FLORISTERIA: 'FLORISTERIA',
//   TIENDA: 'TIENDA',
//   SUPERMERCADOS: 'SUPERMERCADOS',
//   LIBRERIA: 'LIBRERIA',
//   JUGUERIA: 'JUGUERIA',
//   OTRO: 'OTRO'
// };

// export type StoreCategory = (typeof StoreCategory)[keyof typeof StoreCategory]

export type TagType =
  | 'CASA'
  | 'AMIGO'
  | 'PAREJA'
  | 'TRABAJO'
  | 'UNIVERSIDAD'
  | 'OTRO';

export interface Address {
  city: string;
  createdAt: string;
  id: string;
  instructions: string;
  latitude: number;
  longitude: number;
  name: string;
  street: string;
  tag: TagType;
  updatedAt: string;
  zip: string;
}

export interface MyProfileResponse {
  addresses: Address[];
  avatar: string;
  banReason?: string;
  cart: [];
  createdAt: string;
  dni: string;
  email: string;
  facebookAccessToken: string;
  facebookId: string;
  favorites: [];
  id: string;
  isBanned: boolean;
  isNewUser: boolean;
  name: string;
  phone: string;
  refreshToken: string;
  updatedAt: string;
}

export interface MyAddressesResponse {
  id: MyProfileResponse['id'];
  addresses: Address[];
}
