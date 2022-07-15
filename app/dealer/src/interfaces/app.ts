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
