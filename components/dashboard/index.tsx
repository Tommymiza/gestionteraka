"use client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer } from "react-leaflet";

const position: [number, number] = [-21.437469, 47.097942];
export default function MapInteractive() {
  const googleHybrid = L.tileLayer(
    "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
    {
      maxZoom: 20,
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }
  );
  return (
    <div className="w-full flex items-center justify-center">
      <div
        className="relative w-full"
        style={{ height: "calc(100vh - 150px)" }}
      >
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom={false}
          style={{
            width: "100%",
            height: "100%",
          }}
          layers={[googleHybrid]}
        ></MapContainer>
      </div>
    </div>
  );
}
