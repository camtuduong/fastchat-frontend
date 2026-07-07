import { SidebarInset } from "@/components/ui/sidebar";
import { useGetAllConversations } from "@/features/chat/hooks/queries/useGetAllConversations";
import { AppSidebarFriend } from "@/features/friends/components/FriendsSidebar";
import { Outlet } from "@tanstack/react-router";

export function FriendsPage() {
  const { data: conversationsData } = useGetAllConversations({ cursor: "" });

  return (
    <>
      <AppSidebarFriend conversationsData={conversationsData} />
      <SidebarInset className="min-h-0 flex-1 overflow-hidden">
        <Outlet />
      </SidebarInset>
    </>
  );
}
