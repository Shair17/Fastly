import React, {useEffect, useRef} from 'react';
import {Div, Icon, Text} from 'react-native-magnus';
import {ActivityIndicator} from './ActivityIndicator';
import MapView, {
  Marker,
  Polygon,
  MapViewProps,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {useLocation} from '@fastly/hooks/useLocation';
import {Button} from './Button';
import {Coordinates} from '@fastly/interfaces/app';

export interface TMarker {
  title: string;
  description: string;
  coordinate: Coordinates;
}
interface Props {
  markers?: TMarker[];
}

export const Map: React.FC<Props> = ({markers}) => {
  const {
    hasLocation,
    gpsAccessDenied,
    initialPosition,
    userLocation,
    getCurrentLocation,
    callGetCurrentLocation,
    followUserLocation,
    stopFollowUserLocation,
  } = useLocation();

  const mapRef = useRef<MapView>();
  const following = useRef<boolean>(true);

  useEffect(() => {
    followUserLocation();

    return () => stopFollowUserLocation();
  }, []);

  useEffect(() => {
    if (!following.current) return;

    const {latitude, longitude} = userLocation;

    mapRef.current?.animateCamera({
      center: {latitude, longitude},
    });
  }, [userLocation]);

  const centerPosition = async () => {
    const {latitude, longitude} = await getCurrentLocation();

    following.current = true;

    mapRef.current?.animateCamera({
      center: {latitude, longitude},
    });
  };

  if (gpsAccessDenied) {
    return (
      <Div flex={1} justifyContent="center" alignItems="center">
        <Text fontSize="lg" fontWeight="600" textAlign="center">
          Por favor activa el GPS en tu teléfono
        </Text>
        <Button
          mt="lg"
          onPress={callGetCurrentLocation}
          alignSelf="center"
          fontWeight="bold">
          Reintentar
        </Button>
      </Div>
    );
  }

  if (!hasLocation) {
    return (
      <Div flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator />
      </Div>
    );
  }

  return (
    <Div flex={1}>
      <MapView
        ref={el => (mapRef.current = el!)}
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onTouchStart={() => (following.current = false)}>
        {markers?.map(({title, description, coordinate}, key) => (
          <Marker
            key={key.toString()}
            title={title}
            description={description}
            coordinate={coordinate}
          />
        ))}
      </MapView>
      <Button
        position="absolute"
        bg="rgba(0,0,0,0.5)"
        rounded="circle"
        top={10}
        right={10}
        onPress={centerPosition}>
        <Icon
          fontFamily="Ionicons"
          name="compass"
          fontSize="2xl"
          color="white"
        />
      </Button>
    </Div>
  );
};
