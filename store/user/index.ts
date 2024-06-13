import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import type { UserStore } from "./type";

const userStore = create<UserStore>((set) => ({
  user: null,
  loading: false,
  isEditing: false,
  userList: [],
  createUser: async (user) => {
    try {
      set({ loading: true });
      const response = await axios.post(`/users`, user);
      toast.success("User created successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  updateUser: async ({ id, user }) => {
    try {
      set({ loading: true });
      const response = await axios.patch(`/users/${id}`, user);
      set({ isEditing: false, user: null });
      toast.success("User updated successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  deleteUser: async (id) => {
    try {
      set({ loading: true });
      const response = await axios.delete(`/users/${id}`);
      toast.success("User deleted successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getUser: async ({ id, args = {} }) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/users/${id}`, { params });
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
      const response = await axios.get(`/users`, { params });
      set({ userList: response.data });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  editUser: async (id) => {
    try {
      set({ loading: true });
      const response = await axios.get(`/users/${id}`);
      set({ user: response.data, isEditing: true });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  cancelEdit: () => set({ isEditing: false, user: null }),
}));

export default userStore;
