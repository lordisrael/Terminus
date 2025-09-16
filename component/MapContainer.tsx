"use client";

import { GoogleMap, Marker, Polyline, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";

interface MapContainerProps {
  selectedDriver: {
    id: string;
    name: string;
    avatar: string;
    route: { lat: number; lng: number }[];
    position: { lat: number; lng: number };
  } | null;
}

export default function MapContainer({ selectedDriver }: MapContainerProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const center = useMemo(() => ({ lat: 40.7128, lng: -74.006 }), []);

  if (!isLoaded) return <p>Loading Maps...</p>;

  return (
    <GoogleMap
      zoom={10}
      center={selectedDriver ? selectedDriver.position : center}
      mapContainerClassName="w-full h-full rounded-xl"
    >
      {selectedDriver && (
        <>
          {/* Route */}
          <Polyline
            path={selectedDriver.route}
            options={{
              strokeColor: "#7C3AED",
              strokeOpacity: 0.8,
              strokeWeight: 4,
            }}
          />
          {/* Marker with overlay */}
          {/* <Marker
            position={selectedDriver.position}
            icon={{
              url: selectedDriver.avatar,
              scaledSize: new window.google.maps.Size(10, 10),
            }}
          /> */}
          <Marker
            position={selectedDriver.position}
            icon={{
              url:
                "data:image/svg+xml;utf8," +
                encodeURIComponent(`
        <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.3"/>
          </filter>
          <circle cx="12" cy="12" r="8" fill="#9ca3af" stroke="#fff" stroke-width="4" filter="url(#shadow)" />
        </svg>
      `),
              scaledSize: new window.google.maps.Size(32, 32),
            }}
          />
        </>
      )}
    </GoogleMap>
  );
}
