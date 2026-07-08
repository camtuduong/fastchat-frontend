import type { BubblePosition } from "@/features/chat/types/bubbleChat";
import type {
  Conversation,
  ConversationType,
} from "@/features/chat/types/conversation";

export const bubbleClass = (position: BubblePosition, isMyMessage: boolean) => {
  switch (position) {
    case "single":
      return "rounded-2xl";

    case "first":
      return `${isMyMessage ? "rounded-l-2xl rounded-br-2xl rounded-tr-sm" : "rounded-b-2xl rounded-r-2xl"}`;

    case "middle":
      return `${isMyMessage ? "rounded-l-2xl rounded-r-md" : "rounded-l-md rounded-r-2xl "}`;

    case "last":
      return `mt-2 ${isMyMessage ? "rounded-l-2xl rounded-tr-2xl rounded-br-sm" : "rounded-t-2xl rounded-r-2xl"}`;
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

  if (diffMs < 60000) return "Vừa xong";
  if (minutes < 60) return `${minutes} phút trước`;
  if (hours < 24) return `${hours} giờ trước`;
  if (days < 7) return `${days} ngày trước`;

  return new Date(date).toLocaleDateString("vi-VN");
};
