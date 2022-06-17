import React, {FC} from 'react';
import {EmptyContainer} from '../../components/templates/EmptyContainer';

interface Props {
  goToHome: () => void;
}

const emptyFavoritesImage = require('../../assets/images/cart/empty-cart.png');

export const EmptyCart: FC<Props> = ({goToHome}) => {
  return (
    <EmptyContainer
      image={{
        source: emptyFavoritesImage,
        w: 250,
        h: 250,
      }}
      title="Carrito vacío"
      description="Tu carrito está vacío, presiona en el botón para regresar a inicio y agregar productos a tu carrito de compras."
      goToHome={goToHome}
    />
  );
};
