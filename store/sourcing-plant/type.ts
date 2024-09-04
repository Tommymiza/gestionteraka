export type SourcingPlantItem = {
  id: number;
  nom: string;
};

export type SourcingPlantStore = {
  sourcingPlant: SourcingPlantItem | null;
  sourcingPlantList: SourcingPlantItem[];
  loading: boolean;
  createSourcingPlant: (
    sourcingPlant: Partial<SourcingPlantItem>
  ) => Promise<SourcingPlantItem>;
  updateSourcingPlant: ({
    id,
    sourcingPlant,
  }: {
    id: number;
    sourcingPlant: Partial<SourcingPlantItem>;
  }) => Promise<SourcingPlantItem>;
  deleteSourcingPlant: (id: number) => Promise<SourcingPlantItem>;
  getSourcingPlant: ({
    id,
    args,
  }: {
    id: number;
    args?: any;
  }) => Promise<SourcingPlantItem>;
  getSourcingPlants: (args?: any) => Promise<SourcingPlantItem[]>;
  editSourcingPlant: (id: number) => Promise<any>;
  cancelEdit: () => void;
};
