import { create } from "zustand";
import type { ConversationStore } from "@/types/store";

export const useConversationStore = create<ConversationStore>((set) => ({
  conversationDataDetail: null,

  setConversationDataDetail: (conversationDataDetail) =>
    set({ conversationDataDetail }),
  clearConversationDataDetail: () => set({ conversationDataDetail: null }),
}));
