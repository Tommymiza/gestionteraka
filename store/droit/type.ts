export type DroitItem = {
  id: number;
  nom: string;
};

export type DroitStore = {
  droit: DroitItem | null;
  droitList: DroitItem[];
  loading: boolean;
  createDroit: (droit: Partial<DroitItem>) => Promise<DroitItem>;
  updateDroit: ({
    id,
    droit,
  }: {
    id: number;
    droit: Partial<DroitItem>;
  }) => Promise<DroitItem>;
  deleteDroit: (id: number) => Promise<DroitItem>;
  getDroit: ({ id, args }: { id: number; args?: any }) => Promise<DroitItem>;
  getDroits: (args?: any) => Promise<DroitItem[]>;
  editDroit: (id: number) => Promise<any>;
  cancelEdit: () => void;
};
