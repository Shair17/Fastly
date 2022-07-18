import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {GeolocationPermissionsController} from '@fastly/modules/geolocation-permissions/GeolocationPermissionsController';
import {RootStackParams} from '../Root';

export interface GeolocationPermissionsScreenProps
  extends NativeStackScreenProps<
    RootStackParams,
    'GeolocationPermissionsScreen'
  > {}

export const GeolocationPermissionsScreen: React.FC<
  GeolocationPermissionsScreenProps
> = props => {
  return <GeolocationPermissionsController {...props} />;
};
