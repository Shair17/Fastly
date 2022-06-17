import React, {FC} from 'react';
import {EmptyContainer} from '../../components/templates/EmptyContainer';

interface Props {
  goToHome: () => void;
}

const emptyFavoritesImage = require('../../assets/images/favorites/broken-heart.png');

export const EmptyFavorites: FC<Props> = ({goToHome}) => {
  return (
    <EmptyContainer
      image={{
        source: emptyFavoritesImage,
        w: 250,
        h: 250,
      }}
      title="No hay favoritos"
      description="Tu lista de favoritos está vacía, presiona en el botón para regresar a inicio y agregar favoritos a tu lista."
      goToHome={goToHome}
    />
  );
};
