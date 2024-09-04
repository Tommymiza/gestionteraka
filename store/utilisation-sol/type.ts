export type SolUsageItem = {
  id: number;
  nom: string;
};

export type SolUsageStore = {
  solUsage: SolUsageItem | null;
  solUsageList: SolUsageItem[];
  loading: boolean;
  createSolUsage: (solUsage: Partial<SolUsageItem>) => Promise<SolUsageItem>;
  updateSolUsage: ({
    id,
    solUsage,
  }: {
    id: number;
    solUsage: Partial<SolUsageItem>;
  }) => Promise<SolUsageItem>;
  deleteSolUsage: (id: number) => Promise<SolUsageItem>;
  getSolUsage: ({
    id,
    args,
  }: {
    id: number;
    args?: any;
  }) => Promise<SolUsageItem>;
  getSolUsages: (args?: any) => Promise<SolUsageItem[]>;
  editSolUsage: (id: number) => Promise<any>;
  cancelEdit: () => void;
};
