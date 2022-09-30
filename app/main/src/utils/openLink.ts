import {Linking, Alert} from 'react-native';

export const openLink = async (url: string, verify: boolean = true) => {
  if (verify) {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
    } else {
      Alert.alert(`No se puede abrir esta URL: ${url}`);
    }
  } else {
    await Linking.openURL(url);
  }
};
