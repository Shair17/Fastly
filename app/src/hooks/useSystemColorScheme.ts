import {useColorScheme} from 'react-native';

export const useSystemColorScheme = () => {
  const systemColorScheme = useColorScheme();

  return systemColorScheme ?? undefined;
};
