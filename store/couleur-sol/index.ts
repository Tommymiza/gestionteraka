import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import type { SolColorStore } from "./type";

const solColorStore = create<SolColorStore>((set) => ({
  solColor: null,
  loading: false,
  solColorList: [],
  createSolColor: async (solColor) => {
    try {
      set({ loading: true });
      const response = await axios.post(
        `/configuration/ground-color`,
        solColor
      );
      toast.success("SolColor created successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  updateSolColor: async ({ id, solColor }) => {
    try {
      set({ loading: true });
      const response = await axios.patch(
        `/configuration/ground-color/${id}`,
        solColor
      );
      set({ solColor: null });
      toast.success("SolColor updated successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  deleteSolColor: async (id) => {
    try {
      const response = await axios.delete(`/configuration/ground-color/${id}`);
      toast.success("SolColor deleted successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
  getSolColor: async ({ id, args = {} }) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/configuration/ground-color/${id}`, {
        params,
      });
      set({ solColor: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getSolColors: async (args = {}) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/configuration/ground-color`, {
        params,
      });
      set({ solColorList: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  editSolColor: async (id) => {
    try {
      const response = await axios.get(`/configuration/ground-color/${id}`);
      set({ solColor: response.data });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  cancelEdit: () => set({ solColor: null }),
}));

export default solColorStore;
