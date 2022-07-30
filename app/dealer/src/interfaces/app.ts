export interface ForgotPasswordType {
  email: string;
}

export interface SignUpType {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dni: string;
  phone: string;
  address: string;
  // birthDate: string;
}

export interface SignUpBody {
  avatar?: string;
  email: string;
  password: string;
  name: string;
  dni: string;
  phone: string;
  address: string;
  birthDate: string;
}

export enum Vehicle {
  CARRO = 'CARRO',
  MOTO = 'MOTO',
  BICICLETA = 'BICICLETA',
  PIE = 'PIE',
  NONE = 'NONE',
}

export interface Dealer {
  id: string;
  name: string;
  email: string;
  dni: string;
  phone: string;
  address: string;
  avatar: string;
  isBanned: boolean;
  banReason?: string;
  isActive: boolean;
  birthDate: string;
  vehicle: Vehicle;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ForgotPasswordResponse {
  statusCode: number;
  message: string;
  success: boolean;
  // link: string;
  // resetPasswordToken: string;
}

export interface ForgotPasswordBody {
  email: string;
}

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  dealer: Dealer;
}

export interface SignInBody {
  email: string;
  password: string;
}

export interface SignUpResponse extends SignInResponse {}

export interface SignInType {
  email: string;
  password: string;
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
  id: string;
  name: string;
  email: string;
  phone: string;
  dni: string;
  avatar: string;
  address: string;
  available: boolean;
  banReason?: string;
  birthDate: string;
  isActive: boolean;
  isBanned: boolean;
  updatedAt: string;
  createdAt: string;
  vehicle: Vehicle;
}

export interface MyAddressesResponse {
  id: MyProfileResponse['id'];
  addresses: Address[];
}
