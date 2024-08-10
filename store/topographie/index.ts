import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import type { TopographieStore } from "./type";

const topographieStore = create<TopographieStore>((set) => ({
  topographie: null,
  loading: false,
  topographieList: [],
  createTopographie: async (topographie) => {
    try {
      set({ loading: true });
      const response = await axios.post(
        `/configuration/topography`,
        topographie
      );
      toast.success("Topographie created successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  updateTopographie: async ({ id, topographie }) => {
    try {
      set({ loading: true });
      const response = await axios.patch(
        `/configuration/topography/${id}`,
        topographie
      );
      set({ topographie: null });
      toast.success("Topographie updated successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  deleteTopographie: async (id) => {
    try {
      const response = await axios.delete(`/configuration/topography/${id}`);
      toast.success("Topographie deleted successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
  getTopographie: async ({ id, args = {} }) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/configuration/topography/${id}`, {
        params,
      });
      set({ topographie: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getTopographies: async (args = {}) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/configuration/topography`, { params });
      set({ topographieList: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  editTopographie: async (id) => {
    try {
      const response = await axios.get(`/configuration/topography/${id}`);
      set({ topographie: response.data });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  cancelEdit: () => set({ topographie: null }),
}));

export default topographieStore;
