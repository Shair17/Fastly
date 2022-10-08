export enum StoreCategory {
  LICORERIA = 'LICORERIA',
  RESTAURANTE = 'RESTAURANTE',
  MASCOTAS = 'MASCOTAS',
  MODA = 'MODA',
  TECNOLOGIA = 'TECNOLOGIA',
  JUGUETERIA = 'JUGUETERIA',
  FARMACIA = 'FARMACIA',
  CUIDADO_PERSONAL = 'CUIDADO_PERSONAL',
  MAQUILLAJE = 'MAQUILLAJE',
  FLORISTERIA = 'FLORISTERIA',
  TIENDA = 'TIENDA',
  SUPERMERCADOS = 'SUPERMERCADOS',
  LIBRERIA = 'LIBRERIA',
  JUGUERIA = 'JUGUERIA',
  OTRO = 'OTRO',
}

export type Store = {
  id: string;
  name: string;
  description?: string;
  address: string;
  logo?: string;
  category: StoreCategory;
  categoryDescription?: string;
  openTime?: string;
  closeTime?: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  owner: {
    email: string;
  };
};

export interface Customer {
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
  createdAt: string;
  updatedAt: string;
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
  phone: string;
  isActive: boolean;
  address: string;
  avatar: string;
  birthDate: string;
  dni: string;
  isBanned: boolean;
  banReason?: string;
  ranking: number;
  vehicle: Vehicle;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Admin {
  address: string;
  age: number;
  avatar: string;
  banReason?: string;
  birthDate: string;
  createdAt: string;
  dni: string;
  email: string;
  id: string;
  isActive: boolean;
  isBanned: boolean;
  name: string;
  phone: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  dni?: string;
  avatar: string;
  facebookId: string;
  isBanned: boolean;
  banReason?: string;
  createdAt: string;
  updatedAt: string;
}

export type UserAddressTag =
  | 'CASA'
  | 'AMIGO'
  | 'PAREJA'
  | 'TRABAJO'
  | 'UNIVERSIDAD'
  | 'OTRO';

export type UserAddress = {
  id: string;
  name: string;
  street: string;
  instructions: string;
  zip: string;
  city: string;
  tag: UserAddressTag;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
  // userId: string | null;
};

export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  blurHash: string;
  couponId?: string;
  createdAt: string;
  updatedAt: string;
  storeId: string;
};

export enum OrderStatusEnum {
  CANCELLED = 'CANCELLED',
  PROBLEM = 'PROBLEM',
  PENDING = 'PENDING',
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
}

export type OrderStatus =
  | 'CANCELLED'
  | 'PROBLEM'
  | 'PENDING'
  | 'SENT'
  | 'DELIVERED';

export interface Order {
  id: string;
  address: UserAddress;
  createdAt: string;
  updatedAt: string;
  arrivalTime?: string;
  deliveryPrice: number;
  message?: string;
  product: Product;
  quantity: number;
  status: OrderStatus;
  productId: string;
  dealerId?: string;
  userId: string;
  userAddressId: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface OrderClass {
  id: string;
  order: Order & {customerId: string};
  coordinates: Coordinates;
}
