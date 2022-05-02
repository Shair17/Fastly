import React, {FC} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../RootNavigation';
import {GeolocationPermissionsController} from '../../modules/geolocation-permissions/GeolocationPermissionsScreen';

export interface GeolocationPermissionsScreenProps
  extends NativeStackScreenProps<
    RootStackParams,
    'GeolocationPermissionsScreen'
  > {}

export const GeolocationPermissionsScreen: FC<
  GeolocationPermissionsScreenProps
> = props => {
  return <GeolocationPermissionsController {...props} />;
};
