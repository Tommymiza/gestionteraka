export type BosquetGpsItem = {
  id: number;
  uuid_bosquet_gps: string;
  commune_pg: string;
  nom_pg: string;
  num_bosquet: string;
  code: string;
  uuid_membre: string;
  geom: GeoJSON.Polygon;
};

export type BosquetGpsStore = {
  bosquetGps: BosquetGpsItem | null;
  bosquetGpsList: BosquetGpsItem[];
  loading: boolean;
  isEditing: boolean;
  createBosquetGps: (
    bosquetGps: Partial<BosquetGpsItem> & { images?: string[] }
  ) => Promise<BosquetGpsItem>;
  updateBosquetGps: ({
    id,
    bosquetGps,
  }: {
    id: number;
    bosquetGps: Partial<BosquetGpsItem> & { images?: string[] };
  }) => Promise<BosquetGpsItem>;
  deleteBosquetGps: (id: number) => Promise<BosquetGpsItem>;
  getBosquetGps: ({
    id,
    args,
  }: {
    id: number;
    args?: any;
  }) => Promise<BosquetGpsItem>;
  getBosquetGpss: (args?: any) => Promise<BosquetGpsItem[]>;
  editSmallgroup: (id: number) => Promise<any>;
  cancelEdit: () => void;
};
