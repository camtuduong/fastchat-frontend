import type { CustomSidebarStore, SidebarStatusType } from "@/types/store";
import { create } from "zustand";

export const useCustomSidebarStore = create<CustomSidebarStore>((set) => ({
  open: false,
  status: "default",
  threadId: null,
  threadMessageCount: 0,
  threadUnreadCount: 0,
  lastMessage: null,

  setOpen: (open) => set({ open }),
  setStatus: (status: SidebarStatusType) => set({ status }),
  clearStatus: () => set({ status: "default" }),
  setThreadId: (threadId) => set({ threadId }),
  clearThreadId: () => set({ threadId: null }),
  setLastMessage: (lastMessage) => set({ lastMessage }),
  clearLastMessage: () => set({ lastMessage: null }),

  setThreadMessageCount: (threadId, threadMessageCount) => {
    if (threadId) {
      set({ threadMessageCount });
    }
  },
  clearThreadMessageCount: () => set({ threadMessageCount: 0 }),
  setThreadUnreadCount: (threadId, threadUnreadCount) => {
    if (threadId) {
      set({ threadUnreadCount });
    }
  },
  clearThreadUnreadCount: () => set({ threadUnreadCount: 0 }),
}));
