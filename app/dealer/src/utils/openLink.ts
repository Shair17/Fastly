import {Linking, Alert} from 'react-native';

export const openLink = async (url: string) => {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert(`No se puede abrir esta URL: ${url}`);
  }
};
