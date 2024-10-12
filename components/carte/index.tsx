"use client";
import { tileLayer } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer } from "react-leaflet";
import { BosquetCarte } from "./bosquet-gps";
import { SmallGroupCarte } from "./small-group-gps";
import { TreeCarte } from "./tree-gps";

const position: [number, number] = [-20.364383092311595, 47.40390466625538];

export default function MapInteractive() {
  const googleHybrid = tileLayer(
    "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
    {
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
          zoom={13}
          maxZoom={22}
          scrollWheelZoom={false}
          style={{
            width: "100%",
            height: "100%",
          }}
          layers={[googleHybrid]}
        >
          <SmallGroupCarte />
          <TreeCarte />
          <BosquetCarte />
        </MapContainer>
      </div>
    </div>
  );
}
