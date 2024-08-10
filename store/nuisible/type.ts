export type NuisibleItem = {
  fid: number;
  nom: string;
};

export type NuisibleStore = {
  nuisible: NuisibleItem | null;
  nuisibleList: NuisibleItem[];
  loading: boolean;
  createNuisible: (nuisible: Partial<NuisibleItem>) => Promise<NuisibleItem>;
  updateNuisible: ({
    id,
    nuisible,
  }: {
    id: number;
    nuisible: Partial<NuisibleItem>;
  }) => Promise<NuisibleItem>;
  deleteNuisible: (id: number) => Promise<NuisibleItem>;
  getNuisible: ({
    id,
    args,
  }: {
    id: number;
    args?: any;
  }) => Promise<NuisibleItem>;
  getNuisibles: (args?: any) => Promise<NuisibleItem[]>;
  editNuisible: (id: number) => Promise<any>;
  cancelEdit: () => void;
};
