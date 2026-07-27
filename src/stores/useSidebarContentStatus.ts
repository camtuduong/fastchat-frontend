import { create } from "zustand";

import type {
  SidebarContentStatus,
  SidebarContentStatusType,
} from "@/types/store";

export const useSidebarContentStatus = create<SidebarContentStatus>((set) => ({
  status: null,
  setStatus: (status: SidebarContentStatusType) => set({ status }),
  clearStatus: () => set({ status: null }),
}));
