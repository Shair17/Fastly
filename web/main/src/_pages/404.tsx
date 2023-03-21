import type {NextPage} from 'next';
import {Error} from 'components/templates/Error';

const Custom404: NextPage = () => {
  return (
    <Error
      title="404 - Página no encontrada"
      description="No pudimos encontrar la página que estás buscando."
      buttonText="Regresar a Inicio"
    />
  );
};

export default Custom404;
