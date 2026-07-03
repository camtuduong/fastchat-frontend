import { AppSidebar } from "@/features/chat/components/SidebarLeft/AppSidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { useGetAllConversations } from "@/features/chat/hooks/queries/useGetAllConversations";
import { Outlet } from "@tanstack/react-router";

export function FriendsPage() {
  const { data: conversationsData } = useGetAllConversations({ cursor: "" });

  return (
    <>
      <AppSidebar conversationsData={conversationsData} />
      <SidebarInset className="min-h-0 flex-1 overflow-hidden">
        <Outlet />
      </SidebarInset>
    </>
  );
}
