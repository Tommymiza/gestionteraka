import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import type { TreeGpsStore } from "./type";

const treeGpsStore = create<TreeGpsStore>((set) => ({
  treeGps: null,
  loading: false,
  isEditing: false,
  treeGpsList: [],
  createTreeGps: async (treeGps) => {
    try {
      set({ loading: true });
      delete treeGps.images;
      const response = await axios.post(`/tree-gps`, treeGps);
      toast.success("Small group created successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  updateTreeGps: async ({ id, treeGps }) => {
    try {
      set({ loading: true });
      delete treeGps.images;
      const response = await axios.patch(`/tree-gps/${id}`, treeGps);
      set({ isEditing: false, treeGps: null });
      toast.success("Small group updated successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  deleteTreeGps: async (id) => {
    try {
      set({ loading: true });
      const response = await axios.delete(`/tree-gps/${id}`);
      toast.success("Small group deleted successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getTreeGps: async ({ id, args = {} }) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/tree-gps/${id}`, { params });
      set({ treeGps: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getTreeGpss: async (args = {}) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/tree-gps`, { params });
      set({ treeGpsList: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  editSmallgroup: async (id) => {
    try {
      set({ loading: true });
      const response = await axios.get(`/tree-gps/${id}`);
      set({ treeGps: response.data, isEditing: true });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  cancelEdit: () => set({ isEditing: false, treeGps: null }),
}));

export default treeGpsStore;
