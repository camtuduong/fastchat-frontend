import { getAllConversations } from "@/features/chat/api/getAllConversations";
import { useQuery } from "@tanstack/react-query";

type Props = {
  cursor: string;
};
export const useGetAllConversations = ({ cursor }: Props) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["conversations", cursor],
    queryFn: () => getAllConversations(cursor),
  });
  return { data: data?.conversations || [], isLoading, error };
};
