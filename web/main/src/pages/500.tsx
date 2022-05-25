import type {NextPage} from 'next';
import {Error} from 'components/templates/Error';

const Custom500: NextPage = () => {
  return (
    <Error
      title="500 - Algo malo acaba de pasar"
      description="Tenemos algunos problemas en nuestros servidores, estamos trabajando en ello."
      buttonText="Regresar a Inicio"
    />
  );
};

export default Custom500;
