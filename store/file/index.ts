import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { FileStore } from "./type";

async function base64toFile(dataurl: string) {
  let blob = await fetch(dataurl).then((res) => res.blob());
  let file = new File([blob], uuidv4(), { type: "image/jpeg" });
  return file;
}

const fileStore = create<FileStore>((set) => ({
  createFile: async (file) => {
    try {
      let path = file;
      if (path && path.startsWith("data:image")) {
        let upload = await base64toFile(path);
        const formData = new FormData();
        formData.append("file", upload);
        const response = await axios.post(`/file`, formData);
        path = response.data.path;
        toast.success("File uploaded successfully");
      }
      return path;
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw error;
    }
  },
}));

export default fileStore;
