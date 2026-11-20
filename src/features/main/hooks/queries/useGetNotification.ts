import { getNotification } from "@/features/main/api/getNotification";
import { useQuery } from "@tanstack/react-query";

export const useGetNotification = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["notification"],
    queryFn: getNotification,
  });
  return { data, isLoading, error };
};
