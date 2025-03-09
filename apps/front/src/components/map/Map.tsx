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
      const marker1 = new mapboxgl.Marker()
        .setLngLat([2.3522, 48.8566])
        .addTo(map.current);

      // Disable map rotation using right click + drag
      map.current.dragRotate.disable();

      // Disable map rotation using touch rotation gesture
      map.current.touchZoomRotate.disableRotation();
    });

    // Cleanup function
    return () => map.current?.remove();
  }, []);

  return (
    <div className={"w-full h-full py-2 pr-2"}>
      <div ref={mapRef}
           className={"w-full h-full overflow-hidden rounded-xl z-0"}></div>
    </div>
  );
}
