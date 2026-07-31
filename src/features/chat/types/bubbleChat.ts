import type { PinnedMessage } from "@/features/chat/types/conversation";
import type { MessageItem } from "@/features/chat/types/Message";

type BubblePosition = "single" | "first" | "middle" | "last";

type MessageUI = MessageItem & {
  position: BubblePosition;
  showAvatar: boolean;
};

type PinnedMessageUI = PinnedMessage & {
  position: BubblePosition;
};

export type { MessageUI, PinnedMessageUI, BubblePosition };
