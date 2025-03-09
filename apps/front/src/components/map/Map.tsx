"use client";
import mapboxgl from "mapbox-gl";
import React, {useEffect, useRef} from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ProfileMenu from "./ProfileMenu";
import initPopup from "./initPopup";
import createPopup from "./createPopup";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

export default function Map() {
  // TODO: Delete any
  const mapRef: any = useRef(null);
  const map: any = useRef(null);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [2.3522, 48.8566],
      zoom: 12,
    });

    map.current.on("load", () => {
      // TODO: Delete any
      const popup: any = createPopup({
        title: "Ajouter un événement",
      }).createPopupInstance();

      // TODO: Delete any
      const markerInstance: any = new mapboxgl.Marker({color: "#3b82f6"})
        .setLngLat([2.3522, 48.8566])
        .addTo(map.current)
        .setPopup(popup);

      setTimeout(() => {
        const closeBtn = popup._content.getElementsByClassName("close-button")[0];
        closeBtn?.addEventListener("click", () => {
          markerInstance.getPopup().remove();
        });
      }, 0);

      map.current.dragRotate.disable();
      map.current.touchZoomRotate.disableRotation();
    });

    // TODO: Delete any
    map.current.on("click", (event: any) => {
      const target = event.originalEvent.target as HTMLElement;
      if (target.closest(".mapboxgl-marker")) {
        return;
      }

      // TODO: Delete any
      const popup: any = initPopup({
        title: "Je m'appelle Lucas",
      }).createPopupInstance();

      const markerInstance: any = new mapboxgl.Marker({color: "#3b82f6"})
        .setLngLat([event.lngLat.lng, event.lngLat.lat])
        .addTo(map.current)
        .setPopup(popup);

      setTimeout(() => {
        const closeBtn = popup._content.getElementsByClassName("close-button")[0];
        closeBtn?.addEventListener("click", () => {
          markerInstance.getPopup().remove();
        });
      }, 0);
    });

    // Cleanup function
    return () => map.current?.remove();
  }, []);

  return (
    <div className={"w-full h-full pt-2 pb-0 sm:pb-2 pr-2 sm:pl-0 pl-2"}>
      <div ref={mapRef}
           className={`relative w-full h-full overflow-hidden rounded-xl z-0
            [&_.mapboxgl-popup]:!max-w-80
            [&_.mapboxgl-popup-content]:p-0 [&_.mapboxgl-popup-content]:rounded-lg`}>
        <ProfileMenu/>
      </div>
    </div>
  );
}
