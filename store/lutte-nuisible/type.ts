export type LutteNuisibleItem = {
  fid: number;
  nom: string;
};

export type LutteNuisibleStore = {
  lutteNuisible: LutteNuisibleItem | null;
  lutteNuisibleList: LutteNuisibleItem[];
  loading: boolean;
  createLutteNuisible: (
    lutteNuisible: Partial<LutteNuisibleItem>
  ) => Promise<LutteNuisibleItem>;
  updateLutteNuisible: ({
    id,
    lutteNuisible,
  }: {
    id: number;
    lutteNuisible: Partial<LutteNuisibleItem>;
  }) => Promise<LutteNuisibleItem>;
  deleteLutteNuisible: (id: number) => Promise<LutteNuisibleItem>;
  getLutteNuisible: ({
    id,
    args,
  }: {
    id: number;
    args?: any;
  }) => Promise<LutteNuisibleItem>;
  getLutteNuisibles: (args?: any) => Promise<LutteNuisibleItem[]>;
  editLutteNuisible: (id: number) => Promise<any>;
  cancelEdit: () => void;
};
