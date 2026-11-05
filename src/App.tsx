import { SidebarProvider } from "@/components/ui/sidebar";
import { useGetMe } from "@/features/auth/hooks/queries/useGetMe";
import { NavbarHeader } from "@/features/main/layouts/NavbarMain";
import { ThemeProvider } from "@/providers/theme-provider";
import { useAuthStore } from "@/stores/useAuthStore";
import { useSocketStore } from "@/stores/useSocketStore";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useUserStore } from "@/stores/useUser";

export function App() {
  const navigate = useNavigate();
  const clear = useUserStore((state) => state.clear);
  const accessToken = useAuthStore((state) => state.accessToken);
  const { connectSocket, disconnectSocket } = useSocketStore();

  const { data: me, isLoading, error } = useGetMe();

  useEffect(() => {
    if (accessToken) {
      connectSocket();
    }

    return () => {
      disconnectSocket();
    };
  }, [me, accessToken]);

  if (me && error) {
    useAuthStore.getState().clearAuth();
    clear();
    navigate({ to: "/login" });
  }

  if (isLoading) {
    return (
      <div className="flex min-h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <div id="app" className="flex min-h-full flex-col">
        <div
          className={`${accessToken ? "bg-app-shell flex h-full w-full flex-1 overflow-hidden" : ""}`}
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
          <Toaster position="top-right" />
        </div>
      </div>
    </ThemeProvider>
  );
}
