"use client";
import mapboxgl from "mapbox-gl";
import {useEffect, useRef} from "react";
import "mapbox-gl/dist/mapbox-gl.css";

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
      const popup: any = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
      }) // désactive le bouton de fermeture par défaut
        .setHTML(`
                        <div class="p-0">
                            <div class="flex items-center justify-between bg-gray p-1 gap-4">
                                <h3 class="text-yellow text-xl">Je suis un titre</h3>
                                <button class="close-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 7l10 10M7 17L17 7"/></svg>
                                </button>
                            </div>
                            <div class="text-gray text-base p-2">
                                <p>Je suis une description</p>
                            </div>
                        </div>
                    `);

      // TODO: Delete any
      const markerInstance: any = new mapboxgl.Marker({color: "#3b82f6"})
        .setLngLat([2.3522, 48.8566])
        .addTo(map.current)
        .setPopup(popup);

      const closeBtn = popup._content.getElementsByClassName("close-button")[0];
      // Ajoute un gestionnaire d'événements au bouton de fermeture
      closeBtn.addEventListener("click", () => {
        markerInstance.getPopup().remove();
      });

      // Disable map rotation using right click + drag
      map.current.dragRotate.disable();

      // Disable map rotation using touch rotation gesture
      map.current.touchZoomRotate.disableRotation();
    });

    // Cleanup function
    return () => map.current?.remove();
  }, []);

  return (
    <div className={"w-full h-full pt-2 pb-0 sm:pb-2 pr-2 sm:pl-0 pl-2"}>
      <div ref={mapRef}
           className={"w-full h-full overflow-hidden rounded-xl z-0"}></div>
    </div>
  );
}
