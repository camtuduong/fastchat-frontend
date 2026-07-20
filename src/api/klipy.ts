import type { StickerParams } from "@/features/chat/types/sticker";
import { api } from "@/services/api";

export const searchSticker = async (params: StickerParams) => {
  try {
    const response = await api.get("/stickers/search", {
      params,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to search stickers");
  }
};
