export type UserItem = {
  id: number;
  name: string;
  email: string;
  photo?: string;
  cin: string;
  phone: string;
  address: string;
  role: "ADMIN" | "PERSONAL" | "CHAMPION" | "QUANTIFIER";
  is_active: boolean;
};

export type UserStore = {
  user: UserItem | null;
  userList: UserItem[];
  loading: boolean;
  isEditing: boolean;
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
