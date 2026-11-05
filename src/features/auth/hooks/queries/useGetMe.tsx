import { getMe } from "@/features/auth/api/getMe";
import type { User } from "@/features/chat/types/user";
import { useAuthStore } from "@/stores/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

export const useGetMe = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  const { data, error, isLoading } = useQuery<User>({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: !!accessToken,
    retry: (failureCount, error) => {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });

  useEffect(() => {
    if (data?.username) {
      useAuthStore.getState().setUser(data._id, data.displayName || null);
    }
  }, [data]);

  return { data, error, isLoading };
};
