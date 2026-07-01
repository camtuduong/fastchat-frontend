import { getUserBySearch } from "@/features/chat/api/getUserBySearch";
import { useQuery } from "@tanstack/react-query";

type props = {
  params: string;
};
export const useGetUserBySearch = ({ params }: props) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users", "search", params],
    queryFn: () => getUserBySearch(params),
    enabled: params.trim().length > 0,
  });
  return { data, isLoading, error };
};
