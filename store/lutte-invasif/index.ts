import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import type { LutteInvasifStore } from "./type";

const lutteInvasifStore = create<LutteInvasifStore>((set) => ({
  lutteInvasif: null,
  loading: false,
  lutteInvasifList: [],
  createLutteInvasif: async (lutteInvasif) => {
    try {
      set({ loading: true });
      const response = await axios.post(`/lutte-invasif`, lutteInvasif);
      toast.success("LutteInvasif created successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  updateLutteInvasif: async ({ id, lutteInvasif }) => {
    try {
      set({ loading: true });
      const response = await axios.patch(`/lutte-invasif/${id}`, lutteInvasif);
      set({ lutteInvasif: null });
      toast.success("LutteInvasif updated successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  deleteLutteInvasif: async (id) => {
    try {
      const response = await axios.delete(`/lutte-invasif/${id}`);
      toast.success("LutteInvasif deleted successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
  getLutteInvasif: async ({ id, args = {} }) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/lutte-invasif/${id}`, {
        params,
      });
      set({ lutteInvasif: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getLutteInvasifs: async (args = {}) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/lutte-invasif`, {
        params,
      });
      set({ lutteInvasifList: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  editLutteInvasif: async (id) => {
    try {
      const response = await axios.get(`/lutte-invasif/${id}`);
      set({ lutteInvasif: response.data });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  cancelEdit: () => set({ lutteInvasif: null }),
}));

export default lutteInvasifStore;
