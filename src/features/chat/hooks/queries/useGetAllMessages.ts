import {
  getAllMessages,
  type GetAllMessagesResponse,
} from "@/features/chat/api/getAllMessages";
import { useInfiniteQuery } from "@tanstack/react-query";

const emptyMessages: GetAllMessagesResponse = {
  messages: [],
  nextCursor: null,
};

export const useGetAllMessages = (conversationId: string) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    status,
  } = useInfiniteQuery<
    GetAllMessagesResponse,
    Error,
    GetAllMessagesResponse,
    string[],
    string | null
  >({
    queryKey: ["messages", conversationId],
    queryFn: ({ pageParam }) => getAllMessages(conversationId, pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: !!conversationId,
    select: (infiniteData) => ({
      messages: infiniteData.pages.flatMap((page) => page.messages),
      nextCursor:
        infiniteData.pages[infiniteData.pages.length - 1]?.nextCursor ?? null,
    }),
  });
  return {
    data: data ?? emptyMessages,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    status,
  };
};
