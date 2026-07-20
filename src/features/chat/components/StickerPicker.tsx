import { Input } from "@/components/ui/input";
import type { StickerData } from "@/features/chat/types/sticker";
import { useSearchSticker } from "@/hooks/queries/useKlipy";
import { useDebounce } from "@/hooks/useDebounce";
import {
  GIF_PICKER_LIMIT,
  GIF_CONTENT_FILTER,
  GIF_FORMAT_FILTER,
  GIF_DEFAULT_QUERY,
} from "@/utils/constant";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Props = {
  pickerRef?: React.Ref<HTMLDivElement>;
  onStickerClick?: (sticker: StickerData, imageUrl: string) => void;
};

export const StickerPicker = ({ pickerRef, onStickerClick }: Props) => {
  const [searchStickerQuery, setSearchStickerQuery] = useState("");

  const searchDebounce = useDebounce(searchStickerQuery, 500);

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingStickers,
    error: stickerError,
    data: stickers,
  } = useSearchSticker({
    query: searchDebounce ? searchDebounce : GIF_DEFAULT_QUERY,
    per_page: GIF_PICKER_LIMIT,
    format_filter: GIF_FORMAT_FILTER,
    content_filter: GIF_CONTENT_FILTER,
  });

  useEffect(() => {
    if (isLoadingStickers || stickerError) return;

    requestAnimationFrame(() => {
      searchInputRef.current?.focus();
    });
  }, [isLoadingStickers, stickerError]);

  useEffect(() => {
    const list = listRef.current;
    const loadMore = loadMoreRef.current;

    if (!list || !loadMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: list,
        rootMargin: "120px",
      },
    );

    observer.observe(loadMore);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const stickerItems = stickers.pages.flatMap((page) => page.data.data);

  return (
    <div
      ref={pickerRef}
      className="absolute right-20 bottom-15 z-10 flex max-h-100 min-h-100 w-100 flex-col overflow-hidden rounded-xl border bg-white p-4 shadow-lg"
    >
      <div className="relative mb-4 shrink-0">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          ref={searchInputRef}
          className="bg-background pl-9"
          id="search-input"
          placeholder="Search by name or email..."
          type="search"
          value={searchStickerQuery}
          onFocus={() => {}}
          onChange={(e) => setSearchStickerQuery(e.target.value)}
        />
      </div>

      <div
        ref={listRef}
        className="grid flex-1 grid-cols-4 gap-2 overflow-y-auto rounded-md p-2"
      >
        {stickerItems.length > 0 ? (
          stickerItems.map((sticker) => {
            const imageUrl = sticker.file?.md?.webm?.url;

            if (!imageUrl) {
              return null;
            }

            return (
              <video
                autoPlay
                loop
                muted
                playsInline
                key={sticker.id}
                src={imageUrl}
                className="hover:border-accent bg-accent-foreground/5 h-22 w-22 cursor-pointer rounded-md object-contain shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md"
                onClick={() => onStickerClick?.(sticker, imageUrl)}
              />
            );
          })
        ) : (
          <div className="col-span-4 flex h-full w-full items-center justify-center">
            {isLoadingStickers ? (
              <span className="text-muted-foreground">Loading...</span>
            ) : stickerError ? (
              <span className="text-destructive">
                Error: {stickerError.message || "Failed to load stickers"}
              </span>
            ) : (
              <span className="text-muted-foreground">No stickers found</span>
            )}
          </div>
        )}
        <div
          ref={loadMoreRef}
          className="col-span-4 flex h-8 items-center justify-center"
        >
          {isFetchingNextPage && (
            <span className="text-muted-foreground text-sm">Loading...</span>
          )}
        </div>
      </div>
    </div>
  );
};
