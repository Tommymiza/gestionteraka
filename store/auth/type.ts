import type { UserItem } from "../user/type";

export type AuthStore = {
  auth: UserItem | null;
  loading: boolean;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<any>;
  logout: () => Promise<any>;
  check: () => Promise<any>;
  updatePassword: (data: { new: string }) => Promise<any>;
  getMe: () => Promise<any>;
};
