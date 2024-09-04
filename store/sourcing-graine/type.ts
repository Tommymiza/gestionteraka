export type SourcingGraineItem = {
  id: number;
  nom: string;
};

export type SourcingGraineStore = {
  sourcingGraine: SourcingGraineItem | null;
  sourcingGraineList: SourcingGraineItem[];
  loading: boolean;
  createSourcingGraine: (
    sourcingGraine: Partial<SourcingGraineItem>
  ) => Promise<SourcingGraineItem>;
  updateSourcingGraine: ({
    id,
    sourcingGraine,
  }: {
    id: number;
    sourcingGraine: Partial<SourcingGraineItem>;
  }) => Promise<SourcingGraineItem>;
  deleteSourcingGraine: (id: number) => Promise<SourcingGraineItem>;
  getSourcingGraine: ({
    id,
    args,
  }: {
    id: number;
    args?: any;
  }) => Promise<SourcingGraineItem>;
  getSourcingGraines: (args?: any) => Promise<SourcingGraineItem[]>;
  editSourcingGraine: (id: number) => Promise<any>;
  cancelEdit: () => void;
};
