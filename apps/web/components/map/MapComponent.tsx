'use client';
import 'mapbox-gl/dist/mapbox-gl.css';

import mapboxgl from 'mapbox-gl';
import React, { useEffect, useRef } from 'react';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

export default function MapComponent() {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;

          if (!mapRef.current) return;

          map.current = new mapboxgl.Map({
            container: mapRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [longitude, latitude],
            zoom: 14,
          });

          map.current.on('load', () => {
            if (!map.current) return;

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
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error);
        },
      );
    }

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className={'w-full min-h-svh'}>
      <div
        ref={mapRef}
        className={`relative w-full min-h-svh overflow-hidden z-0
                          [&_.mapboxgl-popup]:!max-w-100
                          [&_.mapboxgl-popup-content]:p-0 [&_.mapboxgl-popup-content]:rounded-lg`}
      ></div>
    </div>
  );
}
