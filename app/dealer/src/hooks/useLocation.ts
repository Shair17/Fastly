import {useState, useEffect, useRef} from 'react';
import {LogBox} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export interface ILocation {
  latitude: number;
  longitude: number;
}

export const defaultUserLocation: ILocation = {
  longitude: 0,
  latitude: 0,
};

export const useLocation = () => {
  const [hasLocation, setHasLocation] = useState(false);
  const [gpsAccessDenied, setGpsAccessDenied] = useState<boolean>(false);
  const [routeLines, setRouteLines] = useState<ILocation[]>([]);
  const [initialPosition, setInitialPosition] = useState<ILocation>({
    longitude: 0,
    latitude: 0,
  });
  const [userLocation, setUserLocation] =
    useState<ILocation>(defaultUserLocation);

  const watchId = useRef<number>();
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    callGetCurrentLocation();
  }, []);

  const callGetCurrentLocation = () => {
    getCurrentLocation()
      .then(location => {
        if (!isMounted.current) {
          return;
        }

        setGpsAccessDenied(false);
        setInitialPosition(location);
        setUserLocation(location);
        setRouteLines(routes => [...routes, location]);
        setHasLocation(true);
      })
      .catch(e => {
        if (e.err.code === 5) {
          setGpsAccessDenied(true);
        }
      });
  };

  const getCurrentLocation = (): Promise<ILocation> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({coords}) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        err => reject({err}),
        {enableHighAccuracy: true},
      );
    });
  };

  const followUserLocation = () => {
    watchId.current = Geolocation.watchPosition(
      ({coords}) => {
        if (!isMounted.current) {
          return;
        }

        const location: ILocation = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };

        setGpsAccessDenied(false);
        setUserLocation(location);
        setRouteLines(routes => [...routes, location]);
      },
      err => {
        if (err.code === 5) {
          setGpsAccessDenied(true);
        }
      },
      {enableHighAccuracy: true, distanceFilter: 10},
    );
  };

  const stopFollowUserLocation = () => {
    if (watchId.current) {
      Geolocation.clearWatch(watchId.current);
    }
  };

  return {
    hasLocation,
    gpsAccessDenied,
    initialPosition,
    getCurrentLocation,
    callGetCurrentLocation,
    followUserLocation,
    stopFollowUserLocation,
    userLocation,
    routeLines,
  };
};
