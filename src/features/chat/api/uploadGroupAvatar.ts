import { api } from "@/services/api";
import axios from "axios";

export const uploadGroupAvatar = async (
  conversationId: string,
  formData: FormData,
) => {
  try {
    const res = await api.post(
      `/conversations/${conversationId}/upload-avatar`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
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
