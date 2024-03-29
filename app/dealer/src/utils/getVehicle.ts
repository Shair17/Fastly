import {Vehicle} from '@fastly/interfaces/app';

export const getVehicle = (vehicle: keyof typeof Vehicle) => {
  return (
    {
      CARRO: 'Carro',
      MOTO: 'Moto',
      BICICLETA: 'Bicicleta',
      PIE: 'Pie',
      NONE: 'Ninguno',
    }[vehicle] || 'Ninguno'
  );
};
