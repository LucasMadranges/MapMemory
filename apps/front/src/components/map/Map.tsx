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
                        <div class="rounded-lg overflow-hidden">
                          <div class="relative">
                            <img src="/popup-image.jpg" class="h-48 w-64 object-cover" alt="Image"/>
                            <span class="absolute top-2 left-2 bg-green-400 text-black rounded-md text-md px-1">Vacances</span>
                            <button class="close-button absolute top-2 right-2 bg-white rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 7l10 10M7 17L17 7"/>
                                </svg>
                            </button>
                          </div>
                          <div class="p-2 flex flex-col gap-2">
                              <div class="border-b border-gray-200 rounded-full w-full my-1"></div>
                              <div class="flex items-center justify-between bg-gray gap-4">
                                  <h3 class="text-yellow text-lg">Je suis un titre</h3>
                              </div>
                              <div class="text-gray text-sm flex flex-col gap-2">
                                  <p class="line-clamp-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum, explicabo, optio. Accusantium autem corporis cupiditate dolor eius eos explicabo harum minima perferendis porro repudiandae, saepe sapiente totam, vero vitae voluptatum.</p>
                                  <a href="/" class="underline hover:text-blue-500 transition w-fit flex items-center gap-1">
                                    En savoir plus
                                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="m16 8.4l-8.9 8.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7L14.6 7H7q-.425 0-.712-.288T6 6t.288-.712T7 5h10q.425 0 .713.288T18 6v10q0 .425-.288.713T17 17t-.712-.288T16 16z"/>
                                      </svg>
                                  </a>
                              </div>
                              <div class="text-gray text-sm flex items-center">
                                  <img src="/people-image.jpg" alt="Personne" class="w-8 h-8 rounded-full -mr-2 border-2 border-white"/>
                                  <img src="/people-image.jpg" alt="Personne" class="w-8 h-8 rounded-full -mr-2 border-2 border-white"/>
                                  <img src="/people-image.jpg" alt="Personne" class="w-8 h-8 rounded-full -mr-2 border-2 border-white"/>
                                  <img src="/people-image.jpg" alt="Personne" class="w-8 h-8 rounded-full -mr-2 border-2 border-white"/>
                                  <img src="/people-image.jpg" alt="Personne" class="w-8 h-8 rounded-full -mr-2 border-2 border-white"/>
                                  <span class="ml-3">+2</span>
                              </div>
                              <div class="text-gray text-sm flex gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0-6 0"/>
                                    <path d="M17.657 16.657L13.414 20.9a2 2 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0"/></g>
                                </svg>
                                <span>Jaeger Bar</span>
                              </div>
                              <div class="text-gray text-sm flex gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm12-4v4M8 3v4m-4 4h16m-9 4h1m0 0v3"/>
                                </svg>
                                <span>12 février 2025</span>
                              </div>
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
           className={`w-full h-full overflow-hidden rounded-xl z-0
            [&_.mapboxgl-popup-content]:p-0 [&_.mapboxgl-popup-content]:rounded-lg`}></div>
    </div>
  );
}
