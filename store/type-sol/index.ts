import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import type { SolTypeStore } from "./type";

const solTypeStore = create<SolTypeStore>((set) => ({
  solType: null,
  loading: false,
  solTypeList: [],
  createSolType: async (solType) => {
    try {
      set({ loading: true });
      const response = await axios.post(`/configuration/ground-type`, solType);
      toast.success("SolType created successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  updateSolType: async ({ id, solType }) => {
    try {
      set({ loading: true });
      const response = await axios.patch(
        `/configuration/ground-type/${id}`,
        solType
      );
      set({ solType: null });
      toast.success("SolType updated successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  deleteSolType: async (id) => {
    try {
      const response = await axios.delete(`/configuration/ground-type/${id}`);
      toast.success("SolType deleted successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
  getSolType: async ({ id, args = {} }) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/configuration/ground-type/${id}`, {
        params,
      });
      set({ solType: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getSolTypes: async (args = {}) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/configuration/ground-type`, {
        params,
      });
      set({ solTypeList: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  editSolType: async (id) => {
    try {
      const response = await axios.get(`/configuration/ground-type/${id}`);
      set({ solType: response.data });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  cancelEdit: () => set({ solType: null }),
}));

export default solTypeStore;
