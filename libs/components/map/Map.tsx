'use client';
import 'mapbox-gl/dist/mapbox-gl.css';

import mapboxgl from 'mapbox-gl';
import React, { useEffect, useRef } from 'react';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

export function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    map.current = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [2.3522, 48.8566],
      zoom: 12,
    });
  }, []);

  return (
    <div className={'w-full min-h-screen'}>
      <div
        ref={mapRef}
        className={`relative w-full min-h-screen overflow-hidden z-0
            [&_.mapboxgl-popup]:!max-w-100
            [&_.mapboxgl-popup-content]:p-0 [&_.mapboxgl-popup-content]:rounded-lg`}
      ></div>
    </div>
  );
}
