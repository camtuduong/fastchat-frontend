import { useGetMe } from "@/features/auth/hooks/queries/useGetMe";
import { ThemeProvider } from "@/providers/theme-provider";
import { useAuthStore } from "@/stores/useAuthStore";
import { useSocketStore } from "@/stores/useSocketStore";
import { Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { Toaster } from "sonner";

export function App() {
  useGetMe();
  const { accessToken } = useAuthStore();
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
      <div id="app">
        <Outlet />
        <Toaster position="top-right" richColors />
      </div>
    </ThemeProvider>
  );
}
