import {faker} from '@faker-js/faker';
import * as argon2 from 'argon2';
import {generateRandomDNI} from '../../src/utils/generateRandomDNI';
import {generateRandomPhone} from '../../src/utils/generateRandomPhone';
import {generateCouponCode} from '../../src/utils/generateCouponCode';
import {
  Vehicle,
  UserAddressTag,
  OrderStatus,
  StoreCategory,
} from '@prisma/client';

const DEFAULT_PASSWORD = `XshairX123$`;

export const getImage = faker.image.abstract;

export const getFullName = faker.name.fullName;

export const getEmail = faker.internet.email;

export const getDNI = generateRandomDNI;

export const getPhone = generateRandomPhone;

export const getCouponCode = generateCouponCode;

export const getAddress = () =>
  `${faker.address.street()} ${faker.address.buildingNumber()} ${faker.address.city()}`;

export const getBirthDate = faker.date.birthdate;

export const getAvatar = faker.internet.avatar;

export const getPassword = () => argon2.hash(DEFAULT_PASSWORD);

export const getComment = faker.lorem.lines;

export const getDescription = faker.lorem.lines;

export const getRanking = faker.datatype.number({
  min: 0,
  max: 5,
});

export const getStreet = faker.address.streetAddress;

export const getInstructions = getComment;

export const getCity = faker.address.city;

export const getZip = faker.address.zipCode;

export const getTag = (): keyof typeof UserAddressTag => {
  const items: UserAddressTag[] = [
    'CASA',
    'AMIGO',
    'PAREJA',
    'TRABAJO',
    'UNIVERSIDAD',
    'OTRO',
  ];

  return items[Math.floor(Math.random() * items.length)];
};

export const getVehicle = (): keyof typeof Vehicle => {
  const items: Vehicle[] = ['CARRO', 'MOTO', 'BICICLETA', 'PIE', 'NONE'];

  return items[Math.floor(Math.random() * items.length)];
};

export const getOrderStatus = (): keyof typeof OrderStatus => {
  const items: OrderStatus[] = [
    'CANCELLED',
    'PROBLEM',
    'PENDING',
    'SENT',
    'DELIVERED',
  ];

  return items[Math.floor(Math.random() * items.length)];
};

export const getLatitude = faker.address.latitude;
export const getLongitude = faker.address.longitude;

export const getCoords = () => ({
  latitude: getLatitude(),
  longitude: getLongitude(),
});

export const getStoreCategory = (): keyof typeof StoreCategory => {
  const items: StoreCategory[] = [
    'LICORERIA',
    'RESTAURANTE',
    'MASCOTAS',
    'MODA',
    'TECNOLOGIA',
    'JUGUETERIA',
    'FARMACIA',
    'CUIDADO_PERSONAL',
    'MAQUILLAJE',
    'FLORISTERIA',
    'TIENDA',
    'SUPERMERCADOS',
    'LIBRERIA',
    'JUGUERIA',
    'OTRO',
  ];

  return items[Math.floor(Math.random() * items.length)];
};

export const getNumberBeetwen = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);
