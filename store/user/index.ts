import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import type { UserStore } from "./type";

const userStore = create<UserStore>((set) => ({
  user: null,
  loading: false,
  userList: [],
  createUser: async (user) => {
    try {
      set({ loading: true });
      const response = await axios.post(`/user`, user);
      toast.success("User created successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  updateUser: async ({ id, user }) => {
    try {
      set({ loading: true });
      const response = await axios.patch(`/user/${id}`, user);
      set({ user: null });
      toast.success("User updated successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  deleteUser: async (id) => {
    try {
      const response = await axios.delete(`/user/${id}`);
      toast.success("User deleted successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
  getUser: async ({ id, args = {} }) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/user/${id}`, { params });
      set({ user: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getUsers: async (args = {}) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/user`, { params });
      set({ userList: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  editUser: async (id) => {
    try {
      const response = await axios.get(`/user/${id}`);
      set({ user: response.data });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  cancelEdit: () => set({ user: null }),
}));

export default userStore;
