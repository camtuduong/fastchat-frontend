import { useAuthStore } from "@/stores/useAuthStore";
import { redirect } from "@tanstack/react-router";

export const redirectIfUnauthenticated = () => {
  const { accessToken } = useAuthStore.getState();

  if (!accessToken) {
    throw redirect({ to: "/login" });
  }
};
