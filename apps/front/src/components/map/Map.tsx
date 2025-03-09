"use client";
import mapboxgl from "mapbox-gl";
import {useEffect, useRef} from "react";

export default function Map() {
  // TODO: Delete any
  const mapRef: any = useRef(null);
  const map: any = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 0],
      zoom: 1,
    });
  }, []);

  return (
    <div className={"w-full h-full py-2 pr-2"}>
      <div ref={mapRef}
           className={"w-full h-full overflow-hidden rounded-xl"}></div>
    </div>
  );
}
