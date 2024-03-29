import create from 'zustand';
import {combine} from 'zustand/middleware';
import {Platform} from 'react-native';
import {
  PermissionStatus,
  PERMISSIONS,
  request,
  check,
  openSettings,
} from 'react-native-permissions';

export const usePermissionsStore = create(
  combine(
    {
      locationStatus: 'unavailable' as PermissionStatus,
    },
    set => ({
      checkLocationPermission: async () => {
        let permissionStatus: PermissionStatus;

        if (Platform.OS === 'android') {
          permissionStatus = await check(
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          );
        } else {
          permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        }

        set({locationStatus: permissionStatus});
      },
      askLocationPermission: async () => {
        let permissionStatus: PermissionStatus;

        if (Platform.OS === 'android') {
          permissionStatus = await request(
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          );
        } else {
          permissionStatus = await request(
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          );
        }

        if (permissionStatus === 'blocked') {
          openSettings();
        }

        set({locationStatus: permissionStatus});
      },
    }),
  ),
);
