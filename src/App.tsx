import { SidebarProvider } from "@/components/ui/sidebar";
import { useGetMe } from "@/features/auth/hooks/queries/useGetMe";
import { NavbarHeader } from "@/features/main/layouts/NavbarMain";
import { ThemeProvider } from "@/providers/theme-provider";
import { useAuthStore } from "@/stores/useAuthStore";
import { useSocketStore } from "@/stores/useSocketStore";
import { Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { Toaster } from "sonner";

export function App() {
  useGetMe();
  const accessToken = useAuthStore((state) => state.accessToken);
  const { connectSocket, disconnectSocket } = useSocketStore();

  useEffect(() => {
    if (accessToken) {
      connectSocket();
    }

    return () => {
      disconnectSocket();
    };
  }, [accessToken]);

  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <div id="app" className="flex min-h-full flex-col">
        <div
          className={`${accessToken ? "flex h-full w-full flex-1 overflow-hidden bg-[#F9F9F9]" : ""}`}
        >
          {accessToken ? (
            <>
              <NavbarHeader />
              <SidebarProvider>
                <Outlet />
              </SidebarProvider>
            </>
          ) : (
            <Outlet />
          )}
          <Toaster position="top-right" richColors />
        </div>
      </div>
    </ThemeProvider>
  );
}
