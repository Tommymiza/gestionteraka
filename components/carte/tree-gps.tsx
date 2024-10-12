import treeGpsStore from "@/store/tree-gps";
import { FeatureCollection, GeoJsonProperties } from "geojson";
import L, { LatLngBounds } from "leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import Supercluster, { PointFeature } from "supercluster";
export function TreeCarte() {
  const { treeGpsList, getTreeGpss } = treeGpsStore();
  useEffect(() => {
    getTreeGpss();
  }, []);
  const [zoom, setZoom] = useState(5);
  const [bounds, setBounds] = useState<LatLngBounds | null>(null);
  const map = useMap();

  useEffect(() => {
    const updateMap = () => {
      setZoom(map.getZoom());
      setBounds(map.getBounds());
    };

    map.on("moveend", updateMap);
    updateMap();

    return () => {
      map.off("moveend", updateMap);
    };
  }, [map]);
  const createClusterIcon = (pointCount: number) => {
    return L.divIcon({
      html: `<div class="cluster-marker">${pointCount}</div>`,
      className: "custom-cluster-icon",
      iconSize: [30, 30],
    });
  };

  const trees: FeatureCollection<GeoJSON.Point, GeoJsonProperties> =
    useMemo(() => {
      const features: FeatureCollection<GeoJSON.Point, GeoJsonProperties> = {
        type: "FeatureCollection",
        features: treeGpsList.map((g) => {
          return {
            type: "Feature",
            properties: {
              num: g.numero_arbre,
            },
            geometry: {
              type: g.geom.type,
              coordinates: g.geom.coordinates,
            },
          };
        }),
      };
      return features;
    }, [treeGpsList]);
  const { clusters, supercluster } = useSupercluster(trees, bounds, zoom);

  return clusters.map((cluster, i) => {
    const [longitude, latitude] = cluster.geometry.coordinates;
    const { cluster: isCluster, point_count: pointCount } = cluster.properties;

    if (isCluster) {
      return (
        <Marker
          key={`cluster-${cluster.id}`}
          position={[latitude, longitude]}
          icon={createClusterIcon(pointCount)}
          eventHandlers={{
            click: () => {
              const expansionZoom = Math.min(
                supercluster.getClusterExpansionZoom(+cluster.id!),
                22 // Limiter à un zoom max de 18
              );
              map.setView([latitude, longitude], expansionZoom);
            },
          }}
        ></Marker>
      );
    } else {
      return (
        <Marker
          key={`cluster-${i}`}
          position={[latitude, longitude]}
          icon={createClusterIcon(1)}
          eventHandlers={{
            click: () => {
              // const expansionZoom = Math.min(
              //   supercluster.getClusterExpansionZoom(+cluster.id!),
              //   22 // Limiter à un zoom max de 18
              // );
              // map.setView([latitude, longitude], expansionZoom);
            },
          }}
        >
          <Popup>N°: {cluster.properties.num}</Popup>
        </Marker>
      );
    }
  });
}

const useSupercluster = (
  geojsonData: FeatureCollection<GeoJSON.Point, any>,
  bounds: LatLngBounds | null,
  zoom: number
) => {
  const supercluster = useRef(
    new Supercluster({
      radius: 40,
      maxZoom: 21,
      minZoom: 0,
    })
  );

  const [clusters, setClusters] = useState<PointFeature<any>[]>([]);

  useEffect(() => {
    const bbox: any = bounds
      ? [
          bounds.getWest(),
          bounds.getSouth(),
          bounds.getEast(),
          bounds.getNorth(),
        ]
      : [-180, -85, 180, 85];

    supercluster.current.load(geojsonData.features);

    setClusters(supercluster.current.getClusters(bbox, zoom));
  }, [geojsonData, bounds, zoom]);

  return { clusters, supercluster: supercluster.current };
};
