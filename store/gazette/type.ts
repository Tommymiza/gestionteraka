export type GazetteItem = {
  id: number;
  title: string;
  date_out: string;
  url: string;
};

export type GazetteStore = {
  gazette: GazetteItem | null;
  gazetteList: GazetteItem[];
  loading: boolean;
  createGazette: (gazette: Partial<GazetteItem>) => Promise<GazetteItem>;
  updateGazette: ({
    id,
    gazette,
  }: {
    id: number;
    gazette: Partial<GazetteItem>;
  }) => Promise<GazetteItem>;
  deleteGazette: (id: number) => Promise<GazetteItem>;
  getGazette: ({
    id,
    args,
  }: {
    id: number;
    args?: any;
  }) => Promise<GazetteItem>;
  getGazettes: (args?: any) => Promise<GazetteItem[]>;
  editGazette: (id: number) => Promise<any>;
  cancelEdit: () => void;
};
