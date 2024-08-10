import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import type { NuisibleStore } from "./type";

const nuisibleStore = create<NuisibleStore>((set) => ({
  nuisible: null,
  loading: false,
  nuisibleList: [],
  createNuisible: async (nuisible) => {
    try {
      set({ loading: true });
      const response = await axios.post(`/configuration/nuisible`, nuisible);
      toast.success("Nuisible created successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  updateNuisible: async ({ id, nuisible }) => {
    try {
      set({ loading: true });
      const response = await axios.patch(
        `/configuration/nuisible/${id}`,
        nuisible
      );
      set({ nuisible: null });
      toast.success("Nuisible updated successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  deleteNuisible: async (id) => {
    try {
      const response = await axios.delete(`/configuration/nuisible/${id}`);
      toast.success("Nuisible deleted successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
  getNuisible: async ({ id, args = {} }) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/configuration/nuisible/${id}`, {
        params,
      });
      set({ nuisible: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getNuisibles: async (args = {}) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/configuration/nuisible`, { params });
      set({ nuisibleList: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  editNuisible: async (id) => {
    try {
      const response = await axios.get(`/configuration/nuisible/${id}`);
      set({ nuisible: response.data });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  cancelEdit: () => set({ nuisible: null }),
}));

export default nuisibleStore;
