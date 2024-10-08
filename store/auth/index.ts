import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import type { AuthStore } from "./type";

const authStore = create<AuthStore>((set) => ({
  auth: null,
  loading: true,
  login: async (data) => {
    try {
      const response = await axios.post(`/auth/login`, data);
      const token = response.data.token;
      localStorage.setItem("auth", token);
      toast.success("Logged in successfully!");
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw error;
    }
  },
  check: async () => {
    try {
      set({ loading: true });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("auth")}`;
      const response = await axios.get(`/auth/me`);
      const user = response.data;
      set({ auth: user });
    } catch (error) {
      localStorage.removeItem("auth");
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getMe: async () => {
    try {
      const response = await axios.get(`/auth/me`);
      const user = response.data;
      set({ auth: user });
    } catch (error) {
      throw error;
    }
  },
  updatePassword: async (data) => {
    try {
      await axios.post(`/auth/reset`, data);
      toast.success("Password changed successfully!");
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    try {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("auth");
      set({ auth: null });
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw error;
    }
  },
}));

export default authStore;
