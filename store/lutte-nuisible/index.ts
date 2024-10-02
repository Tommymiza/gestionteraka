import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import type { LutteNuisibleStore } from "./type";

const lutteNuisibleStore = create<LutteNuisibleStore>((set) => ({
  lutteNuisible: null,
  loading: false,
  lutteNuisibleList: [],
  createLutteNuisible: async (lutteNuisible) => {
    try {
      set({ loading: true });
      const response = await axios.post(`/lutte-nuisible`, lutteNuisible);
      toast.success("LutteNuisible created successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  updateLutteNuisible: async ({ id, lutteNuisible }) => {
    try {
      set({ loading: true });
      const response = await axios.patch(
        `/lutte-nuisible/${id}`,
        lutteNuisible
      );
      set({ lutteNuisible: null });
      toast.success("LutteNuisible updated successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  deleteLutteNuisible: async (id) => {
    try {
      const response = await axios.delete(`/lutte-nuisible/${id}`);
      toast.success("LutteNuisible deleted successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
  getLutteNuisible: async ({ id, args = {} }) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/lutte-nuisible/${id}`, {
        params,
      });
      set({ lutteNuisible: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getLutteNuisibles: async (args = {}) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/lutte-nuisible`, {
        params,
      });
      set({ lutteNuisibleList: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  editLutteNuisible: async (id) => {
    try {
      const response = await axios.get(`/lutte-nuisible/${id}`);
      set({ lutteNuisible: response.data });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  cancelEdit: () => set({ lutteNuisible: null }),
}));

export default lutteNuisibleStore;
