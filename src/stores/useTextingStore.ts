import { create } from "zustand";
import type { TextingStore } from "@/types/store";

export const useTextingStore = create<TextingStore>((set) => ({
  userTexting: [],

  setUserTexting: (conversationId, userId, userDisplayName) =>
    set((state) => {
      if (
        !state.userTexting.some(
          (item) =>
            item.conversationId === conversationId && item.userId === userId,
        )
      ) {
        return {
          userTexting: [
            ...state.userTexting,
            { conversationId, userId, userDisplayName },
          ],
        };
      }
      return state;
    }),
  clearUserTexting: (conversationId, userId) =>
    set((state) => ({
      userTexting: state.userTexting.filter(
        (item) =>
          item.conversationId !== conversationId || item.userId !== userId,
      ),
    })),
}));
