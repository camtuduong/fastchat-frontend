import type {
  BubblePosition,
  MessageUI,
} from "@/features/chat/types/bubbleChat";
import type {
  Conversation,
  ConversationType,
} from "@/features/chat/types/conversation";
import type { MessageItem } from "@/features/chat/types/Message";

const TEN_MINUTES_IN_MINUTES = 20;

const getTimeDiffInMs = (currentDate: string, compareDate: string) => {
  const diffMs =
    new Date(currentDate).getTime() - new Date(compareDate).getTime();

  return Math.abs(diffMs) / (60 * 1000);
};

export const bubbleChat = (messageItem: MessageItem[]): MessageUI[] => {
  return messageItem.map((message, index) => {
    const prevMessage = messageItem[index - 1];
    const nextMessage = messageItem[index + 1];

    const samePrev =
      !!prevMessage &&
      prevMessage.sender.userId === message.sender.userId &&
      getTimeDiffInMs(message.createdAt, prevMessage?.createdAt || "") <
        TEN_MINUTES_IN_MINUTES;
    const sameNext =
      !!nextMessage &&
      nextMessage.sender.userId === message.sender.userId &&
      getTimeDiffInMs(nextMessage?.createdAt || "", message.createdAt) <
        TEN_MINUTES_IN_MINUTES;

    let position: BubblePosition;

    if (!samePrev && !sameNext) {
      position = "single";
    } else if (samePrev && !sameNext) {
      position = "last";
    } else if (samePrev && sameNext) {
      position = "middle";
    } else {
      position = "first";
    }

    return {
      ...message,
      position,
      showAvatar: position === "single" || position === "last",
    };
  });
};

export const bubbleClass = (position: BubblePosition, isMyMessage: boolean) => {
  switch (position) {
    case messagePositionToLabel.single:
      return "rounded-2xl";

    case messagePositionToLabel.first:
      return `${isMyMessage ? "rounded-l-2xl rounded-br-2xl rounded-tr-sm" : "rounded-b-2xl rounded-r-2xl"}`;

    case messagePositionToLabel.middle:
      return `${isMyMessage ? "rounded-l-2xl rounded-r-md" : "rounded-l-md rounded-r-2xl "}`;

    case messagePositionToLabel.last:
      return ` ${isMyMessage ? "rounded-l-2xl rounded-tr-2xl rounded-br-sm" : "rounded-t-2xl rounded-r-2xl"}`;
  }
};

export const bubbleReplyClass = (
  position: BubblePosition,
  isMyMessage: boolean,
) => {
  switch (position) {
    case messagePositionToLabel.single:
      return "rounded-t-2xl rounded-b-xl";

    case messagePositionToLabel.first:
      return `${isMyMessage ? "rounded-tl-2xl rounded-b-xl rounded-tr-sm" : "rounded-b-xl rounded-r-2xl"}`;

    case messagePositionToLabel.middle:
      return `${isMyMessage ? "rounded-tl-2xl rounded-b-xl rounded-tr-sm" : "rounded-tl-md rounded-tr-2xl rounded-b-xl"}`;

    case messagePositionToLabel.last:
      return ` ${isMyMessage ? "rounded-l-2xl rounded-tr-2xl rounded-br-sm" : "rounded-t-2xl rounded-r-2xl"}`;
  }
};

export const conversationTypeToLabel: Record<ConversationType, string> = {
  direct: "direct",
  group: "group",
};

export const getMembers = (conversationData: Conversation, userId: string) => {
  return conversationData?.participants
    .map((participant) => participant)
    .filter((participant) => participant.userId !== userId);
};

export const timeAgo = (date: string) => {
  const diffMs = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMs / 3600000);
  const days = Math.floor(diffMs / 86400000);

  if (diffMs < 60000) return "just now";
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  if (days < 7) return `${days} days ago`;

  return new Date(date).toLocaleDateString("vi-VN");
};

export const messagePositionToLabel: Record<BubblePosition, string> = {
  single: "single",
  first: "first",
  middle: "middle",
  last: "last",
};
