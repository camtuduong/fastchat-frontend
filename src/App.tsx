import { Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";

export function App() {
  return (
    <div id="app">
      <Outlet />
      <Toaster position="top-right" richColors />
    </div>
  );
}
