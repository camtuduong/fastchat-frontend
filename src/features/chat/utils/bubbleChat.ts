import type {
  BubblePosition,
  MessageUI,
} from "@/features/chat/types/bubbleChat";
import type { MessageItem } from "@/features/chat/types/Message";

export const bubbleChat = (messageItem: MessageItem[]): MessageUI[] => {
  return messageItem.map((message, index) => {
    const prevMessage = messageItem[index - 1];
    const nextMessage = messageItem[index + 1];

    const samePrev = prevMessage?.sender.userId === message.sender.userId;
    const sameNext = nextMessage?.sender.userId === message.sender.userId;

    let position: BubblePosition;

    if (!samePrev && !sameNext) {
      position = "single";
    } else if (!samePrev && sameNext) {
      position = "first";
    } else if (samePrev && sameNext) {
      position = "middle";
    } else {
      position = "last";
    }

    return {
      ...message,
      position,
      showAvatar: position === "single" || position === "last",
    };
  });
};
