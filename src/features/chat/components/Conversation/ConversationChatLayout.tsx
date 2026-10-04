import { ConversationInputChat } from "@/features/chat/components/Conversation/ConversationInputChat";
import { ArrowDownToDot } from "lucide-react";
import { ConversationBody } from "@/features/chat/components/Conversation/ConversationBody";
import { Spinner } from "@/components/ui/spinner";
import type { ReactVirtualizer } from "@tanstack/react-virtual";
import type { MessageUI } from "@/features/chat/types/bubbleChat";

type Props = {
  isLoading: boolean;
  messages: MessageUI[];
  virtualizer: ReactVirtualizer<HTMLDivElement, HTMLDivElement>;
  myUserId: string | undefined | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onScroll: (event: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  hasNewMessage: number;
  scrollToLatest: () => void;
  conversationId: string | undefined;
  setHasNewMessage: React.Dispatch<React.SetStateAction<number>>;
  isFetchingNextPage: boolean;
  isGetDataDetail?: boolean;
  bodyClassName?: string;
};
export const ConversationChatLayout = ({
  isLoading,
  messages,
  virtualizer,
  myUserId,
  containerRef,
  onScroll,
  hasNewMessage,
  scrollToLatest,
  conversationId,
  setHasNewMessage,
  isFetchingNextPage,
  isGetDataDetail = true,
  bodyClassName,
}: Props) => {
  return (
    <>
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner className="size-6" />
        </div>
      ) : (
        <ConversationBody
          key={conversationId}
          messages={messages}
          virtualizer={virtualizer}
          myUserId={myUserId}
          containerRef={containerRef}
          onScroll={onScroll}
          isFetchingNextPage={isFetchingNextPage}
          isGetDataDetail={isGetDataDetail}
          bodyClassName={bodyClassName}
        />
      )}
      {hasNewMessage > 0 && (
        <div className="flex items-center justify-center">
          <button
            type="button"
            className="animate-bounce cursor-pointer rounded-full p-2 transition-colors duration-200 hover:bg-gray-200"
            onClick={scrollToLatest}
          >
            <ArrowDownToDot className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Spacer for footer */}
      <ConversationInputChat
        conversationId={conversationId}
        virtualizer={virtualizer}
        setHasNewMessage={setHasNewMessage}
      />
    </>
  );
};
