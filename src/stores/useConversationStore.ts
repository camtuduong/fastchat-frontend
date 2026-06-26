import { create } from "zustand";

interface ConversationStore {
  conversationId: string;
  setConversationId: (conversationId: string) => void;
}

export const useConversationStore = create<ConversationStore>((set) => ({
  conversationId: "",
  setConversationId: (conversationId) => set({ conversationId }),
}));
