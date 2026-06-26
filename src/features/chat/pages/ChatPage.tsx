import { AppSidebar } from "@/features/chat/components/AppSidebar";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useGetAllConversations } from "@/features/chat/hooks/queries/useGetAllConversations";
import { useConversationStore } from "@/stores/useConversationStore";
import { useEffect } from "react";
import { Outlet } from "@tanstack/react-router";

export function ChatPage() {
  const { data: conversationsData } = useGetAllConversations({ cursor: "" });

  //
  useEffect(() => {
    if (conversationsData) {
      useConversationStore
        .getState()
        .setConversationId(conversationsData[0]?._id);
    }
  }, [conversationsData]);

  return (
    <SidebarProvider>
      <AppSidebar conversationsData={conversationsData} />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
