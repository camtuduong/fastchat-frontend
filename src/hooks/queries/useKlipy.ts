import { searchSticker } from "@/api/klipy";
import type {
  StickerParams,
  StickerResponse,
} from "@/features/chat/types/sticker";
import { type InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

const emptyStickerResponse: InfiniteData<StickerResponse, number> = {
  pages: [],
  pageParams: [],
};

export const useSearchSticker = ({
  query,
  per_page,
  format_filter,
  content_filter,
}: Omit<StickerParams, "page"> & { query: string }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery<
    StickerResponse,
    Error,
    InfiniteData<StickerResponse, number>,
    readonly ["search-sticker", string],
    number
  >({
    queryKey: ["search-sticker", query],

    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      searchSticker({
        query,
        page: pageParam,
        per_page,
        format_filter,
        content_filter,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.has_next) {
        return undefined;
      }
      const nextPage = lastPage.data.current_page + 1;
      if (nextPage > 3) {
        return undefined;
      }
      return nextPage;
    },
  });
  return {
    data: data ?? emptyStickerResponse,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  };
};
