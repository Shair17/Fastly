import {useColorScheme} from 'react-native';

export const useSystemColorScheme = () => {
  const systemColorScheme = useColorScheme();

  // retornar el color scheme del usuario o si no es soportado devolver `light`
  return systemColorScheme ?? undefined;
};
