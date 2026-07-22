import type { MessageState } from "@/types/store";
import { create } from "zustand";

export const useMessageStore = create<MessageState>((set, get) => ({
  message: null,
  replyMessage: null,

  getReplyMessage: () => get().replyMessage,
  setReplyMessage: (message) => set({ replyMessage: message }),
  clearReplyMessage: () => set({ replyMessage: null }),
}));
