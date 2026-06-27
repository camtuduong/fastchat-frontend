import { useGetMe } from "@/features/auth/hooks/queries/useGetMe";
import { Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";

export function App() {
  useGetMe();

  return (
    <div id="app">
      <Outlet />
      <Toaster position="top-right" richColors />
    </div>
  );
}
