import { SidebarInset } from "@/components/ui/sidebar";
import { AppSidebarFriend } from "@/features/friends/components/FriendsSidebar";
import { Outlet } from "@tanstack/react-router";

export function FriendsPage() {
  return (
    <>
      <AppSidebarFriend />
      <SidebarInset className="min-h-0 flex-1 overflow-hidden">
        <Outlet />
      </SidebarInset>
    </>
  );
}
