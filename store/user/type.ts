export type UserItem = {
  id: number;
  nom: string;
  email: string;
  annee_naissance: number;
  num_tel: string;
  photo?: string | null;
  adresse: string;
  genre: "H" | "F";
  role: "ADMIN" | "PERSONNEL" | "RELAIS" | "QUANTIFICATEUR";
  is_active: boolean;
};

export type UserStore = {
  user: UserItem | null;
  userList: UserItem[];
  loading: boolean;
  createUser: (user: Partial<UserItem>) => Promise<UserItem>;
  updateUser: ({
    id,
    user,
  }: {
    id: number;
    user: Partial<UserItem>;
  }) => Promise<UserItem>;
  deleteUser: (id: number) => Promise<UserItem>;
  getUser: ({ id, args }: { id: number; args?: any }) => Promise<UserItem>;
  getUsers: (args?: any) => Promise<UserItem[]>;
  editUser: (id: number) => Promise<any>;
  cancelEdit: () => void;
};
