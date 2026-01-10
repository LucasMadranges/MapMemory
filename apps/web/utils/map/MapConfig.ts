import mapboxgl from 'mapbox-gl';
import { RefObject } from 'react';

export function MapConfig(
  map: RefObject<mapboxgl.Map | null>,
  mapRef: RefObject<HTMLDivElement | null>,
  longitude: number,
  latitude: number,
) {
  if (!mapRef.current) return;

  map.current = new mapboxgl.Map({
    container: mapRef.current,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [longitude, latitude],
    zoom: 14,
  });

  map.current.on('load', () => {
    if (!map.current || map.current.getSource('user-location')) return;

    map.current.addSource('user-location', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
      },
    });

    map.current.addLayer({
      id: 'user-location-halo',
      type: 'circle',
      source: 'user-location',
      paint: {
        'circle-radius': 20,
        'circle-color': '#1E90FF',
        'circle-opacity': 0.25,
      },
    });

    map.current.addLayer({
      id: 'user-location-dot',
      type: 'circle',
      source: 'user-location',
      paint: {
        'circle-radius': 6,
        'circle-color': '#1E90FF',
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff',
      },
    });
  });

  return () => {
    map?.current?.remove();
  };
}
