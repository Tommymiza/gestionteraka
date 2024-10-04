import smallGroupGpsStore from "@/store/small-group-gps";
import { Feature, FeatureCollection } from "geojson";
import L, { LatLng, Layer } from "leaflet";
import { useEffect, useMemo } from "react";
import { GeoJSON } from "react-leaflet";
export function SmallGroupCarte() {
  const { smallGroupGpsList, getSmallGroupGpss, loading } =
    smallGroupGpsStore();
  useEffect(() => {
    getSmallGroupGpss({
      include: {
        smallGroup: true,
      },
    });
  }, []);
  const onEachFeature = (feature: Feature, layer: Layer) => {
    if (feature.properties && feature.properties.name) {
      layer.bindPopup(feature.properties.name);
    }
  };

  const createPgIcon = (name: string) => {
    return L.divIcon({
      className: "small-group-icon",
      html: `<div class="small-group-pin"></div><div class="small-group-label">${name}</div>`,
      iconSize: [30, 42],
      iconAnchor: [15, 42],
    });
  };

  const pointToLayer = (feature: Feature, latlng: LatLng) => {
    const { nom } = feature.properties as any;
    return L.marker(latlng, { icon: createPgIcon(nom) });
  };
  const smallGroups: React.ReactElement | null = useMemo(() => {
    const features: FeatureCollection = {
      type: "FeatureCollection",
      features: smallGroupGpsList.map((g) => {
        return {
          type: "Feature",
          properties: {
            nom: g.smallGroup.nom,
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
        pointToLayer={pointToLayer}
      />
    ) : null;
  }, [smallGroupGpsList]);
  return smallGroups;
}
