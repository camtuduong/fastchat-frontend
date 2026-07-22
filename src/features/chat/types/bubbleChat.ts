import type { MessageItem } from "@/features/chat/types/Message";

type BubblePosition = "time" | "single" | "first" | "middle" | "last";

type MessageUI = MessageItem & {
  position: BubblePosition;
  showAvatar: boolean;
};

export type { MessageUI, BubblePosition };
