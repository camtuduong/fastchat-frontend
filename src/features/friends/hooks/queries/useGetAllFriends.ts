import { getAllFriends } from "@/features/friends/api/getAllFriends";
import { useQuery } from "@tanstack/react-query";

type props = {
  params: string;
};

export const useGetAllFriend = ({ params }: props) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getAllFriends", params],
    queryFn: () => getAllFriends(params),
  });
  return { data: data?.friends || [], isLoading, error };
};
