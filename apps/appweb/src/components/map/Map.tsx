'use client';
import mapboxgl from 'mapbox-gl';
import React, { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import ProfileMenu from './ProfileMenu';
import initPopup from './initPopup';
import AddEvent from './AddEvent';
import { gsap } from 'gsap';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

export default function Map() {
  // TODO: Delete any
  const mapRef: any = useRef(null);
  const map: any = useRef(null);
  const [close, setClose] = useState(true);
  const panelRef = useRef(null);
  const panelActive = useRef(false);
  const tempMarkerActive = useRef(false);
  const markerInstance: any = useRef(null);

  function handleCloseAdd() {
    if (close) {
      if (panelActive.current) return;

      // Animation pour ouvrir le panneau
      setClose(false);
      panelActive.current = true;

      gsap.fromTo(
        panelRef.current,
        {
          x: '-100%',
        },
        {
          x: '0%',
          duration: 0.5,
          ease: 'power3.out',
        }
      );
    } else {
      // Animation pour fermer le panneau
      markerInstance.current.remove();
      tempMarkerActive.current = false;

      gsap.to(panelRef.current, {
        x: '-100%',
        duration: 0.5,
        ease: 'power3.out',
        onComplete: () => {
          setClose(true);
          panelActive.current = false;
        },
      });
    }
  }

  function handleClickMap(event: any) {
    const target = event.originalEvent.target as HTMLElement;
    if (target.closest('.mapboxgl-marker')) {
      return;
    }

    if (tempMarkerActive.current) {
      markerInstance.current.remove();
    }

    markerInstance.current = new mapboxgl.Marker({ color: '#f6721d' })
      .setLngLat([event.lngLat.lng, event.lngLat.lat])
      .addTo(map.current);

    tempMarkerActive.current = true;
    handleCloseAdd();
  }

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [2.3522, 48.8566],
      zoom: 12,
    });

    map.current.on('load', () => {
      // TODO: Delete any
      const popup: any = initPopup({
        title: 'Ajouter un événement',
      }).createPopupInstance();

      // TODO: Delete any
      const markerInstance: any = new mapboxgl.Marker({ color: '#3b82f6' })
        .setLngLat([2.3522, 48.8566])
        .addTo(map.current)
        .setPopup(popup);

      setTimeout(() => {
        const closeBtn =
          popup._content.getElementsByClassName('close-button')[0];
        closeBtn?.addEventListener('click', () => {
          markerInstance.getPopup().remove();
        });
      }, 0);

      map.current.dragRotate.disable();
      map.current.touchZoomRotate.disableRotation();
    });

    // TODO: Delete any
    map.current.on('click', (event: any) => handleClickMap(event));

    // Cleanup function
    return () => map.current?.remove();
  }, []);

  return (
    <div className={'w-full h-full'}>
      <div
        ref={mapRef}
        className={`relative w-full h-full overflow-hidden z-0
            [&_.mapboxgl-popup]:!max-w-100
            [&_.mapboxgl-popup-content]:p-0 [&_.mapboxgl-popup-content]:rounded-lg`}
      >
        <ProfileMenu />
        <AddEvent
          hidden={close}
          handleClose={handleCloseAdd}
          panelRef={panelRef}
        />
      </div>
    </div>
  );
}
