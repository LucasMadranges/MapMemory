'use client';
import 'mapbox-gl/dist/mapbox-gl.css';

import mapboxgl from 'mapbox-gl';
import React, { useEffect, useRef } from 'react';

import { MapConfig } from '../../utils/map/MapConfig';

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

          MapConfig(map, mapRef, longitude, latitude);
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error);
        },
      );
    }
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
