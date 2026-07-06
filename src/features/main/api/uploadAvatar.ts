import { api } from "@/lib/api";
import axios from "axios";

export const uploadAvatar = async (formData: FormData) => {
  try {
    const res = await api.post("/users/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.message;
      if (status === 400) throw new Error(message ?? "Invalid file");
      if (status === 500)
        throw new Error(message ?? "Server error, please try again");
    }
    throw error;
  }
};
