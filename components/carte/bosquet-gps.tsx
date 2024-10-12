import bosquetGpsStore from "@/store/bosquet-gps";
import { Feature, FeatureCollection } from "geojson";
import { Layer } from "leaflet";
import { useEffect, useMemo } from "react";
import { GeoJSON } from "react-leaflet";
export function BosquetCarte() {
  const { bosquetGpsList, getBosquetGpss } = bosquetGpsStore();
  useEffect(() => {
    getBosquetGpss();
  }, []);
  const onEachFeature = (feature: Feature, layer: Layer) => {
    if (feature.properties && feature.properties.name) {
      layer.bindPopup(feature.properties.name);
    }
  };

  const bosquets: React.ReactElement | null = useMemo(() => {
    const features: FeatureCollection = {
      type: "FeatureCollection",
      features: bosquetGpsList.map((g) => {
        return {
          type: "Feature",
          properties: {
            code: g.code,
          },
          geometry: {
            type: g.geom.type,
            coordinates: g.geom.coordinates,
          },
        };
      }),
    };
    return features.features.length > 0 ? (
      <GeoJSON
        data={features}
        onEachFeature={onEachFeature}
        style={{
          dashArray: [4, 4],
          color: "#f22011",
        }}
      />
    ) : null;
  }, [bosquetGpsList]);
  return bosquets;
}
