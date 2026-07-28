import { type GetAllMessagesResponse } from "@/features/chat/api/getAllMessages";
import { getMessagesPinnedInConversation } from "@/features/chat/api/getAllMessagesPinnedInConversation";
import { useInfiniteQuery } from "@tanstack/react-query";

const emptyMessagesPin: GetAllMessagesResponse = {
  messages: [],
  nextCursor: null,
};

export const useGetAllMessagesPinned = (conversationId: string) => {
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
    queryKey: ["messages-Pinned", conversationId],
    queryFn: ({ pageParam }) =>
      getMessagesPinnedInConversation(conversationId, pageParam),
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
    data: data ?? emptyMessagesPin,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    status,
  };
};
