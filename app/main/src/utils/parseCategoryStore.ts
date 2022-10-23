export const parseCategoryStore = (category: string) => {
  return (
    {
      LICORERIA: 'Licorería',
      RESTAURANTE: 'Restaurante',
      MASCOTAS: 'Mascotas',
      MODA: 'Moda',
      TECNOLOGIA: 'Tecnología',
      JUGUETERIA: 'Juguetería',
      FARMACIA: 'Farmacia',
      CUIDADO_PERSONAL: 'Cuidado Personal',
      MAQUILLAJE: 'Maquillaje',
      FLORISTERIA: 'Floristería',
      TIENDA: 'Tienda',
      SUPERMERCADOS: 'Supermercados',
      LIBRERIA: 'Librería',
      JUGUERIA: 'Juguería',
      OTRO: 'Otro',
    }[category] || 'Desconocido'
  );
};
