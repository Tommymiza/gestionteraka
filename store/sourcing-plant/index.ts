import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import type { SourcingPlantStore } from "./type";

const sourcingPlantStore = create<SourcingPlantStore>((set) => ({
  sourcingPlant: null,
  loading: false,
  sourcingPlantList: [],
  createSourcingPlant: async (sourcingPlant) => {
    try {
      set({ loading: true });
      const response = await axios.post(
        `/configuration/sourcing-plant`,
        sourcingPlant
      );
      toast.success("SourcingPlant created successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  updateSourcingPlant: async ({ id, sourcingPlant }) => {
    try {
      set({ loading: true });
      const response = await axios.patch(
        `/configuration/sourcing-plant/${id}`,
        sourcingPlant
      );
      set({ sourcingPlant: null });
      toast.success("SourcingPlant updated successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  deleteSourcingPlant: async (id) => {
    try {
      const response = await axios.delete(
        `/configuration/sourcing-plant/${id}`
      );
      toast.success("SourcingPlant deleted successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
  getSourcingPlant: async ({ id, args = {} }) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/configuration/sourcing-plant/${id}`, {
        params,
      });
      set({ sourcingPlant: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getSourcingPlants: async (args = {}) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/configuration/sourcing-plant`, {
        params,
      });
      set({ sourcingPlantList: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  editSourcingPlant: async (id) => {
    try {
      const response = await axios.get(`/configuration/sourcing-plant/${id}`);
      set({ sourcingPlant: response.data });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  cancelEdit: () => set({ sourcingPlant: null }),
}));

export default sourcingPlantStore;
