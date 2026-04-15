"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

// San Francisco Coordinates
const position: [number, number] = [37.7925055797561, -122.39630738468164];

export default function MapComponent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full min-h-[400px] bg-slate-900/50 animate-pulse flex items-center justify-center rounded-2xl">
        <span className="text-white/50 text-lg font-medium">Loading map...</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative" style={{ minHeight: "400px" }}>
      <MapContainer
        center={position}
        zoom={14}
        scrollWheelZoom={false}
        className="w-full h-full absolute inset-0 rounded-2xl z-0"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={position}>
          <Popup className="custom-popup">
            <div className="text-slate-800 p-1">
              <h3 className="font-bold text-lg mb-1">Main Headquarters</h3>
              <p className="text-sm">123 Tech Drive, San Francisco</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
