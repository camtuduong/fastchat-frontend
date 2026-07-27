import { AppSidebar } from "@/features/chat/components/SidebarLeft/AppSidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { useGetAllConversations } from "@/features/chat/hooks/queries/useGetAllConversations";
import { Outlet } from "@tanstack/react-router";
import { useUserStore } from "@/stores/useUser";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";

export function ChatPage() {
  const myId = useAuthStore((state) => state.userId);
  const addUsers = useUserStore((state) => state.addUsers);
  const { data: conversationsData } = useGetAllConversations({ cursor: "" });

  useEffect(() => {
    if (!conversationsData) return;

    const users = conversationsData.flatMap((conversation) =>
      conversation.participants
        .filter((participant) => participant.userId !== myId)
        .map((participant) => participant),
    );

    addUsers(users);
  }, [conversationsData, myId, addUsers]);
  return (
    <>
      <AppSidebar conversationsData={conversationsData} />
      <SidebarInset className="min-h-0 flex-1 overflow-hidden">
        <Outlet />
      </SidebarInset>
    </>
  );
}
