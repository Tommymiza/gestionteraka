import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import type { SolUsageStore } from "./type";

const solUsageStore = create<SolUsageStore>((set) => ({
  solUsage: null,
  loading: false,
  solUsageList: [],
  createSolUsage: async (solUsage) => {
    try {
      set({ loading: true });
      const response = await axios.post(`/ground-use`, solUsage);
      toast.success("SolUsage created successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  updateSolUsage: async ({ id, solUsage }) => {
    try {
      set({ loading: true });
      const response = await axios.patch(`/ground-use/${id}`, solUsage);
      set({ solUsage: null });
      toast.success("SolUsage updated successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  deleteSolUsage: async (id) => {
    try {
      const response = await axios.delete(`/ground-use/${id}`);
      toast.success("SolUsage deleted successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
  getSolUsage: async ({ id, args = {} }) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/ground-use/${id}`, {
        params,
      });
      set({ solUsage: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getSolUsages: async (args = {}) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/ground-use`, { params });
      set({ solUsageList: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  editSolUsage: async (id) => {
    try {
      const response = await axios.get(`/ground-use/${id}`);
      set({ solUsage: response.data });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  cancelEdit: () => set({ solUsage: null }),
}));

export default solUsageStore;
